const canonicalOrigin = new URL(
  process.env.SEO_BASE_URL || "https://montessoris.net"
)
canonicalOrigin.pathname = "/"
canonicalOrigin.search = ""
canonicalOrigin.hash = ""

const canonicalBase = canonicalOrigin.toString().replace(/\/$/, "")
const canonicalHost = canonicalOrigin.hostname.replace(/^www\./, "")
const unknownPath = `/seo-404-check-${Date.now()}/`

const checks = [
  {
    name: "HTTP redirects to canonical HTTPS host",
    url: `http://${canonicalHost}/`,
    status: [301, 308],
    location: `${canonicalBase}/`,
  },
  {
    name: "www redirects to the non-www canonical host",
    url: `https://www.${canonicalHost}/`,
    status: [301, 308],
    location: `${canonicalBase}/`,
  },
  {
    name: "index.html redirects to the clean home URL",
    url: `${canonicalBase}/index.html`,
    status: [301, 308],
    location: `${canonicalBase}/`,
  },
  {
    name: ".html redirects to the trailing-slash URL",
    url: `${canonicalBase}/blog/toys-vs-materials.html`,
    status: [301, 308],
    location: `${canonicalBase}/blog/toys-vs-materials/`,
  },
  {
    name: "unknown URLs return a real 404",
    url: `${canonicalBase}${unknownPath}`,
    status: [404],
  },
  {
    name: "canonical content URL is available",
    url: `${canonicalBase}/blog/toys-vs-materials/`,
    status: [200],
    canonical: `${canonicalBase}/blog/toys-vs-materials/`,
  },
  {
    name: "robots.txt is available",
    url: `${canonicalBase}/robots.txt`,
    status: [200],
  },
  {
    name: "sitemap.xml is available",
    url: `${canonicalBase}/sitemap.xml`,
    status: [200],
  },
]

let failures = 0

function normalizeLocation(value, base) {
  if (!value) return null
  return new URL(value, base).toString()
}

for (const check of checks) {
  try {
    const response = await fetch(check.url, {
      redirect: "manual",
      headers: {
        "user-agent": "montessoris-seo-verifier/1.0",
      },
    })

    const problems = []
    if (!check.status.includes(response.status)) {
      problems.push(`status ${response.status}, expected ${check.status.join(" or ")}`)
    }

    if (check.location) {
      const actualLocation = normalizeLocation(response.headers.get("location"), check.url)
      if (actualLocation !== check.location) {
        problems.push(`location ${actualLocation || "<missing>"}, expected ${check.location}`)
      }
    }

    if (check.canonical && response.status === 200) {
      const html = await response.text()
      const canonicalMatch = html.match(
        /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i
      )
      const actualCanonical = canonicalMatch?.[1]
        ? new URL(canonicalMatch[1], check.url).toString()
        : null
      if (actualCanonical !== check.canonical) {
        problems.push(
          `canonical ${actualCanonical || "<missing>"}, expected ${check.canonical}`
        )
      }
    }

    if (problems.length > 0) {
      failures += 1
      console.error(`FAIL ${check.name}: ${problems.join("; ")}`)
    } else {
      console.log(`PASS ${check.name}`)
    }
  } catch (error) {
    failures += 1
    console.error(`FAIL ${check.name}: ${error instanceof Error ? error.message : error}`)
  }
}

if (failures > 0) {
  console.error(`\n${failures} production SEO check(s) failed.`)
  process.exitCode = 1
} else {
  console.log("\nAll production SEO checks passed.")
}
