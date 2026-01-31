const dictionaries = {
  ko: {
    header: {
      about: "몬테소리란?",
      benefits: "장점",
      programs: "프로그램",
    },
    hero: {
      title: "아이의 잠재력을 깨우는",
      subtitle: "엄마와 아이가 함께 성장하는 특별한 시간.\n미국 몬테소리 협회(AMS) 기준에 맞춘 정통 교육 프로그램을 만나보세요.",
      cta: "자세히 알아보기",
    },
    philosophy: {
      badge: "Montessori Education",
      title: '"나 혼자 할 수 있도록 도와주세요"',
      p1: "몬테소리 교육은 단순히 지식을 주입하는 학습법이 아닙니다. 이탈리아의 의사이자 교육가였던 마리아 몬테소리 박사가 창안한 이 교육법은, 아이들이 태어날 때부터 스스로 배우고자 하는 본능적인 욕구와 무한한 잠재력을 가지고 있다는 깊은 믿음에서 출발합니다. 우리는 아이를 미성숙한 존재로 보지 않고, 스스로 성장할 수 있는 능력을 갖춘 존엄한 인격체로 바라봅니다.",
      p2: "우리의 역할은 아이를 가르치거나 주도하는 것이 아니라, 아이의 발달 단계에 완벽하게 맞춰진 '준비된 환경(Prepared Environment)'을 제공하는 것입니다. 그 안에서 아이는 스스로 교구를 선택하고 몰입하며, 내면의 질서를 잡고 자신만의 속도로 성장해 나갑니다. 이것이 바로 100년 넘게 전 세계적으로 검증된 몬테소리 교육의 본질입니다.",
      feature1: "아이의 자율성을 100% 존중하는 자기 주도적 학습 환경",
      feature2: "개별 발달 속도와 흥미에 맞춘 1:1 맞춤형 교구 활동",
      feature3: "내면의 질서감과 깊은 집중력을 자연스럽게 이끌어내는 환경",
    },
    why: {
      title: "왜 Montessori인가요?",
      subtitle: "단순한 놀이가 아닙니다. 아이의 결정적 시기에 맞춘 체계적인 환경과 과학적인 교구로 일생을 살아가는 데 필요한 자율성, 집중력, 그리고 긍정적인 자존감을 키워줍니다.",
      feature1_title: "AMS 기준 정통 교육",
      feature1_desc: "미국 몬테소리 협회(AMS)의 엄격한 기준을 철저히 준수한 교육 환경을 제공합니다. 검증된 커리큘럼과 자격증을 보유한 전문 교사가 아이의 성장을 체계적으로 지원합니다.",
      feature2_title: "발달 단계별 맞춤",
      feature2_desc: "모든 아이는 다릅니다. 우리는 획일적인 단체 수업을 거부하고, 아이의 개월 수와 발달 속도, 기질에 맞춘 1:1 개별 맞춤 교육 프로그램(IEP)을 운영하여 학습 효과를 극대화합니다.",
      feature3_title: "부모 교육 파트너십",
      feature3_desc: "가정에서도 일관성 있는 몬테소리 교육이 이어질 수 있도록, 부모님을 위한 정기적인 교육과 상담, 가정 내 환경 구성 가이드를 제공하여 진정한 교육 파트너십을 구축합니다.",
    },
    blog: {
      title: "최신 블로그 소식",
      subtitle: "몬테소리 전문가가 전하는 아이 교육 정보",
      viewAll: "전체보기",
      readMore: "더 읽어보기",
    },
    programs: {
      title: "교육 프로그램",
      subtitle: "신생아부터 학령기 전 아동까지, 아이의 인생에서 가장 중요한 '결정적 시기(Critical Periods)'를 놓치지 않도록 설계된 단계별 커리큘럼입니다.",
      nido: {
        age: "0-14개월",
        name: "Nido (니도)",
        desc: "엄마의 품처럼 편안하고 안전한 환경에서 신뢰감을 형성합니다. 감각 발달을 위한 모빌 활동, 대소근육 발달을 돕는 신체 활동을 통해 세상과 처음 만나는 아이의 건강한 발달을 돕습니다.",
      },
      ic: {
        age: "14-36개월",
        name: "IC (Infant Community)",
        desc: "걸음마를 시작하고 언어가 폭발적으로 발달하는 시기입니다. '일상 영역' 활동을 통해 스스로 입고 먹는 법을 배우며 독립심을 기르고, 타인과의 상호작용을 통해 자아와 사회성을 형성합니다.",
      },
      casa: {
        age: "3-6세",
        name: "Casa (어린이의 집)",
        desc: "흡수 정신이 극대화되는 시기입니다. 일상, 감각, 언어, 수, 문화 등 5대 영역의 통합 교육을 통해 논리적 사고력과 추상적 개념을 구체화하며, 예의와 배려를 갖춘 전인적인 어린이로 성장합니다.",
      },
      parenting: {
        age: "전 연령",
        name: "부모 코칭",
        desc: "몬테소리 교육은 가정에서 완성됩니다. 아이를 관찰하는 법, 기질에 맞는 훈육법, 가정 내 몬테소리 환경 구성법 등 실질적인 육아 솔루션을 제공합니다.",
      },
      features: {
        title: "프로그램 특징",
        f1_title: "1:1 완전 맞춤형 교육",
        f1_desc: "아이마다 다른 발달 속도와 관심사를 깊이 관찰하여, 그 시점에 가장 필요한 교구를 적절한 순간에 제시(Presentation)합니다.",
        f2_title: "프리미엄 정통 AMS 교구",
        f2_desc: "플라스틱 장난감이 아닌, 따뜻한 질감의 원목 교구를 사용합니다. 미국 몬테소리 협회(AMS) 인증 기준을 통과한 안전하고 교육적인 교구들은 아이의 감각을 섬세하게 자극합니다.",
      }
    },
    montessori: {
      title: "몬테소리 교육이란?",
      subtitle: '"스스로 할 수 있도록 도와주세요"\n아이는 자신을 창조하는 놀라운 능력을 가지고 있습니다.',
      history: {
        title: "마리아 몬테소리 (Maria Montessori)",
        p1: "몬테소리 교육의 창시자 마리아 몬테소리는 이탈리아 최초의 여성 의사였습니다. 그녀는 정신지체 아동들을 관찰하며 그들이 감각적인 자극에 반응한다는 것을 발견하고, 이를 일반 아동 교육에 적용하여 혁신적인 교육법을 창안했습니다.",
        p2: "1907년 로마의 빈민가에 '어린이의 집(Casa dei Bambini)'을 설립하여, 아이들이 준비된 환경 속에서 스스로 선택하고 집중할 때 놀라운 성장을 보인다는 것을 처음으로 증명했습니다.",
        img_alt: "마리아 몬테소리",
      },
      elements: {
        title: "몬테소리 교육의 3요소",
        child_title: "아이 (The Child)",
        child_desc: "아이는 빈 그릇이 아닙니다. 스스로 학습하고 성장하려는 강력한 내부 에너지와 '흡수정신(Absorbent Mind)'을 가진 주체적인 존재입니다. 우리는 아이가 가진 무한한 가능성을 신뢰합니다.",
        env_title: "준비된 환경 (Environment)",
        env_desc: "아이의 눈높이에 맞춘 가구, 발달 단계에 맞는 매력적인 교구, 그리고 심리적인 안정감을 주는 질서 정연한 공간입니다. 아이는 이 환경 속에서 자유롭게 선택하고 탐색하며 스스로를 발달시킵니다.",
        director_title: "제시자 (Director)",
        director_desc: "교사는 지식을 주입하는 'Teacher'가 아닌, 아이와 환경을 연결해주는 'Director'입니다. 아이를 세심하게 관찰하고, 도움이 필요한 적절한 순간(Teachable Moment)에 개입하여 성장을 돕습니다.",
      },
      quote: {
        text: "교육의 목적은 아이가 독립적인 인격체로 성장하도록 돕는 것입니다. 우리는 아이가 혼자 할 수 있는 일을 결코 대신 해주어서는 안 됩니다.",
        author: "Maria Montessori",
      }
    },
    footer: {
      privacy: "개인정보처리방침",
      terms: "이용약관",
      contact: "문의하기",
    },
    benefits: {
      title: "몬테소리 교육의 장점",
      subtitle: "아이의 무한한 잠재력을 깨우는 몬테소리 교육, 어떤 점이 특별할까요?",
      items: [
        {
          id: "independence",
          title: "자율성과 독립심 (Independence)",
          desc: "스스로 선택하고 해내는 경험을 통해 'I Can Do It'이라는 강한 자신감을 키웁니다.",
          content: "몬테소리 교육의 핵심 철학은 'Help me do it by myself'입니다. 준비된 환경 속에서 아이는 자신이 원하는 교구를 직접 선택하고, 자신의 속도에 맞춰 활동하며, 마무리 정리까지 스스로 해냅니다. 어른의 지시에 따르는 것이 아니라 주도적으로 행동하는 이 과정은 아이에게 깊은 성취감을 주며, 이는 훗날 주체적인 삶을 살아가는 독립적인 인격체로 성장하는 단단한 뿌리가 됩니다."
        },
        {
          id: "concentration",
          title: "몰입과 집중력 (Concentration)",
          desc: "방해받지 않는 깊은 몰입의 경험은 아이의 두뇌를 발달시키는 최고의 자양분입니다.",
          content: "아이들은 흥미로운 작업에 몰두할 때 놀라운 집중력을 발휘합니다. 몬테소리 교구는 아이의 호기심을 자극하고 도전을 불러일으키도록 과학적으로 설계되었습니다. 아이가 활동에 깊이 빠져있는 '몰입의 순간'을 존중하고 보호해줌으로써, 아이는 긴 시간 동안 주의를 기울이는 힘을 기르고, 내면의 평화와 정서적 안정을 얻게 됩니다."
        },
        {
          id: "social-emotional",
          title: "사회성과 배려 (Social Development)",
          desc: "경쟁이 아닌 협력을 배우며, 타인을 존중하는 따뜻한 사회성을 기릅니다.",
          content: "몬테소리 교실은 작은 사회입니다. 다양한 연령대가 어우러진 혼합 연령 학급(Mixed Age Group)에서 동생은 형을 보며 배우고, 형은 동생을 도와주며 자연스럽게 리더십과 배려심을 익힙니다. 하나의 교구를 사용하기 위해 기다리는 법, 친구의 작업을 방해하지 않는 법, 갈등을 평화롭게 해결하는 법을 생활 속에서 체득하며 성숙한 시민 의식을 갖추게 됩니다."
        },
        {
          id: "creativity",
          title: "창의적 문제 해결력 (Problem Solving)",
          desc: "정해진 답을 외우는 것이 아니라, 스스로 원리를 깨우치고 해결책을 찾아냅니다.",
          content: "대부분의 몬테소리 교구는 '오류의 정정(Control of Error)' 기능을 내장하고 있습니다. 아이는 활동 중에 자신이 실수했다는 것을 스스로 인지하고, 선생님의 지적 없이도 스스로 수정하는 과정을 거치게 됩니다. 실패를 두려워하지 않고 다양한 시도를 통해 답을 찾아가는 과정에서 아이는 비판적 사고력과 창의적인 문제 해결 능력을 자연스럽게 습득합니다."
        }
      ]
    },
    contact: {
      title: "문의하기",
      subtitle: "궁금하신 점이 있으시면 언제든 문의해 주세요.",
      name: "이름",
      email: "이메일",
      message: "문의 내용",
      send: "메시지 보내기",
    },
    privacy: {
      title: "개인정보처리방침",
    },
    terms: {
      title: "이용약관",
    }
  },
  en: {
    header: {
      about: "What is Montessori?",
      benefits: "Benefits",
      programs: "Programs",
    },
    hero: {
      title: "Unlocking Your Child's Potential",
      subtitle: "A special time for mother and child to grow together.\nExperience authentic Montessori programs following AMS standards.",
      cta: "Learn More",
    },
    philosophy: {
      badge: "Montessori Education",
      title: '"Help me do it by myself"',
      p1: "Montessori education is not merely a method of imparting knowledge. Conceived by Dr. Maria Montessori, Italy's first female physician and educator, this pedigree of education starts with the profound belief that children are born with an instinctive desire to learn and infinite potential. We view the child not as an immature being, but as a dignified individual capable of self-directed growth.",
      p2: "Our role is not to teach or lead the child, but to provide a 'Prepared Environment' perfectly tailored to the child's developmental stage. Within this environment, children freely choose their work, immerse themselves, establish internal order, and grow at their own unique pace. This is the essence of Montessori education, verified globally for over 100 years.",
      feature1: "Self-directed learning environment fully respecting the child's autonomy",
      feature2: "1:1 personalized manipulative activities tailored to individual developmental pace and interests",
      feature3: "Environment that naturally elicits a sense of internal order and deep concentration",
    },
    why: {
      title: "Why Montessori?",
      subtitle: "It is not just play. We foster the autonomy, concentration, and positive self-esteem necessary for a lifetime through a systematic environment and scientific materials tailored to the child's critical periods.",
      feature1_title: "Authentic AMS Education",
      feature1_desc: "We provide an educational environment that strictly adheres to the rigorous standards of the American Montessori Society (AMS). Our curriculum is verified, and our certified professional teachers systematically support your child's growth.",
      feature2_title: "Tailored by Developmental Stage",
      feature2_desc: "Every child is different. We reject uniform group lessons and operate a 1:1 Individualized Education Program (IEP) tailored to the child's age, developmental speed, and temperament to maximize learning effects.",
      feature3_title: "Parent Partnership",
      feature3_desc: "To ensure consistent Montessori education at home, we provide regular education and counseling for parents, along with guides for setting up the home environment, establishing a true educational partnership.",
    },
    blog: {
      title: "Latest Blog Posts",
      subtitle: "Educational tips for children from Montessori experts",
      viewAll: "View All",
      readMore: "Read More",
    },
    programs: {
      title: "Educational Programs",
      subtitle: "A step-by-step curriculum designed not to miss the 'Critical Periods' in a child's life, from newborns to pre-schoolers.",
      nido: {
        age: "0-14 months",
        name: "Nido",
        desc: "We build trust in an environment as comfortable and safe as a mother's embrace. Through mobile activities for sensory development and physical activities for gross/fine motor skills, we assist the healthy development of children meeting the world for the first time.",
      },
      ic: {
        age: "14-36 months",
        name: "IC (Infant Community)",
        desc: "This is the period when toddlers start walking and language explodes. Through 'Practical Life' activities, they learn to dress and eat by themselves, fostering independence, and form their ego and social skills through interaction with others.",
      },
      casa: {
        age: "3-6 years",
        name: "Casa (Children's House)",
        desc: "This is the period when the absorbent mind is at its peak. Through integrated education in 5 main areas—Practical Life, Sensory, Language, Math, and Culture—children concretize logical thinking and abstract concepts, growing into holistic children with manners and consideration.",
      },
      parenting: {
        age: "All Ages",
        name: "Parent Coaching",
        desc: "Montessori education is completed at home. We provide practical parenting solutions, including how to observe your child, discipline methods suited to their temperament, and how to configure the Montessori environment at home.",
      },
      features: {
        title: "Program Features",
        f1_title: "1:1 Fully Personalized Education",
        f1_desc: "We deeply observe each child's different developmental speed and interests, presenting the necessary materials at the most appropriate moment (Presentation).",
        f2_title: "Premium Authentic AMS Materials",
        f2_desc: "We use warm-textured wooden materials, not plastic toys. High-quality materials that pass AMS certification standards safely and educationally stimulate the child's senses delicately.",
      }
    },
    montessori: {
      title: "What is Montessori?",
      subtitle: '"Help me do it by myself"\nChildren have an amazing ability to create themselves.',
      history: {
        title: "Maria Montessori",
        p1: "Maria Montessori, the founder of Montessori education, was Italy's first female physician. She discovered that children with mental disabilities responded to sensory stimulation and created an innovative educational method by applying this to general child education.",
        p2: "In 1907, she established 'Casa dei Bambini' (Children's House) in a slum in Rome, proving for the first time that children show remarkable growth when they choose and concentrate on their own in a prepared environment.",
        img_alt: "Maria Montessori",
      },
      elements: {
        title: "3 Elements of Montessori",
        child_title: "The Child",
        child_desc: "The child is not an empty vessel. They are subjective beings with powerful internal energy to learn and grow on their own, known as the 'Absorbent Mind'. We trust the infinite potential the child possesses.",
        env_title: "Prepared Environment",
        env_desc: "A psychologically stable and orderly space with furniture tailored to the child's eye level and attractive materials suited to their developmental stage. Here, children freely select and explore, developing themselves.",
        director_title: "The Director",
        director_desc: "The teacher is not a 'Teacher' who injects knowledge, but a 'Director' who connects the child and the environment. They closely observe the child and intervene at the 'Teachable Moment' to assist growth.",
      },
      quote: {
        text: "The goal of early childhood education should be to activate the child's own natural desire to learn. We must never help a child with a task at which he feels he can succeed.",
        author: "Maria Montessori",
      }
    },
    footer: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contact: "Contact Us",
      rights: "All rights reserved.",
    },
    benefits: {
      title: "Advantages of Montessori",
      subtitle: "Montessori education awakens the infinite potential of children. What makes it special?",
      items: [
        {
          id: "independence",
          title: "Autonomy and Independence",
          desc: "Through the experience of choosing and doing it themselves, children build strong confidence: 'I Can Do It'.",
          content: "The core philosophy of Montessori is 'Help me do it by myself'. In a prepared environment, children choose the materials they want, work at their own pace, and even clean up after themselves. This process of acting proactively rather than following adult instructions gives children a deep sense of achievement, becoming a solid foundation for growing into an independent individual who leads a self-directed life."
        },
        {
          id: "concentration",
          title: "Concentration and Flow",
          desc: "The experience of deep immersion without interruption is the best nourishment for a child's brain development.",
          content: "Children exhibit amazing concentration when immersed in interesting work. Montessori materials are scientifically designed to stimulate curiosity and provoke challenges. By respecting and protecting the 'moment of flow' when a child is deeply engaged in an activity, the child develops the power to pay attention for a long time and gains inner peace and emotional stability."
        },
        {
          id: "social-emotional",
          title: "Social Development and Empathy",
          desc: "Children learn cooperation instead of competition, fostering warm social skills that respect others.",
          content: "The Montessori classroom is a small society. In a Mixed Age Group where various ages mingle, younger children learn by watching older ones, and older children naturally learn leadership and caring by helping younger ones. They acquire mature citizenship by learning how to wait for a single material, not to disturb a friend's work, and how to resolve conflicts peacefully in daily life."
        },
        {
          id: "creativity",
          title: "Creative Problem Solving",
          desc: "Instead of memorizing fixed answers, children realize principles and find solutions on their own.",
          content: "Most Montessori materials have a built-in 'Control of Error' function. Children realize they have made a mistake during the activity and go through the process of correcting it themselves without the teacher's pointing it out. In the process of finding answers through various attempts without fearing failure, children naturally acquire critical thinking and creative problem-solving skills."
        }
      ]
    },
    contact: {
      title: "Contact Us",
      subtitle: "Feel free to reach out to us with any questions.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
    },
    privacy: {
      title: "Privacy Policy",
    },
    terms: {
      title: "Terms of Service",
    }
  }
}

export type Locale = keyof typeof dictionaries
export const getDictionary = (locale: Locale) => dictionaries[locale] || dictionaries.ko
