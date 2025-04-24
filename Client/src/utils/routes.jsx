import PatentLogo from "../assets/patent.png"
import Research from "../assets/research.png"
import Conference from "../assets/conference.png"
import Seminar from "../assets/seminar.png"
import MOU from "../assets/mou.png"

import Workshop from "../assets/workshop.png"
import Bootcamp from "../assets/bootcamp.png"
import Alumini from "../assets/alumini.png"
import Industrial from "../assets/industrial.png"
import Hackathon from "../assets/hackathon.png"
import Guest from "../assets/guest_lecture.png"
import Celebration from "../assets/day_celebration.png"
import Convocation from "../assets/convocation.png"
import Scholarship from "../assets/scholarship.png"

import Zest from "../assets/zest.png"
import Techfest from "../assets/techfest.png"
import Sports from "../assets/aamod.png"
import Club from "../assets/club.png"
import Oath from "../assets/oath.png"

import Rnd from "../assets/r&d.png"
import College from "../assets/college.png"
import Exam from "../assets/exam.png"
import Tyro from "../assets/tyro.png"


const desc = "This section includes diverse campus activities beyond Tyro Club and R&D Cell, covering guest lectures, celebrations, alumni meets, convocations, and more, enriching the overall student experience."
const desc1 = "Hands-on training session to develop practical skills and knowledge."
const rdesc = "The R&D Cell fosters innovation and research through diverse academic activities, encouraging students and faculty to explore, experiment, and contribute to advancements in science, technology, and knowledge."
const tdesc = "The Tyro Club is the college’s dynamic organizing body, managing major events like tech fests, cultural fests, and sports fests, fostering teamwork, creativity, and campus engagement among students."



// Note:' keys are routes


// export const routes = {
//     "r&d_cell": {
//         name: 'Research & Development Cell',
//         logo: Rnd,
//         description: rdesc,
//         activity: {
//             "patent": { name: "Patent", description: desc1, logo: PatentLogo },
//             "research_paper": { name: "Research Paper", description: desc1, logo: Research },
//             "conference": { name: "Conference", description: desc1, logo: Conference },
//             "seminar": { name: "Seminar", description: desc1, logo: Seminar },
//             "mou": { name: "MOU", description: desc1, logo: MOU }
//         }
//     },

//     "other": {
//         name: "All College Activities",
//         logo: College,
//         description: desc,
//         activity: {
//             "workshop": { name: "Workshop", description: desc1, logo: Workshop },
//             "bootcamp": { name: "Bootcamp", description: desc1, logo: Bootcamp },
//             "alumini_meet": { name: "Alumini Meet", description: desc1, logo: Alumini },
//             "industrial_visit": { name: "Industrial Visit", description: desc1, logo: Industrial },
//             "hackathon": { name: "Hackathon", description: desc1, logo: Hackathon },
//             "guest_lecture": { name: "Guest Lecture", description: desc1, logo: Guest },
//             "day_celebration": { name: "Day Celebration", description: desc1, logo: Celebration },
//             "important_exam": { name: "National Exam", description: desc1, logo: Exam }

//         }


//     },



//     "tyro": {
//         name: 'TYRO Club',
//         description: tdesc,
//         logo: Tyro,
//         activity: {
//             "zest": { name: "ZEST", description: desc1, logo: Zest },
//             "techvyom": { name: "Techvyom", description: desc1, logo: Techfest },
//             "aamod": { name: "Aamod", description: desc1, logo: Sports },
//             "club_activity": { name: "Club Activity", description: desc1, logo: Club },
//             "oath_ceremony": { name: "Oath Ceremony", description: desc1, logo: Oath },

//         }
//     },

//     "trust": {
//         name: "SRMS Trust",
//         description: desc,
//         activity: {
//             "scholarship": { name: "Trust Scholarship", description: desc1, logo: Scholarship },
//             "convocation": { name: "Convocation", description: desc1, logo: Convocation },
//         }
//     }



// };


export const routes = {
    "r&d_cell": {
      name: 'Research & Development Cell',
      logo: Rnd,
      description: rdesc,
      activity: {
        "patent": {
          name: "Patent",
          description: "Legal protection for innovative inventions by students or faculty.",
          logo: PatentLogo
        },
        "research_paper": {
          name: "Research Paper",
          description: "Scholarly article presenting original research and findings.",
          logo: Research
        },
        "conference": {
          name: "Conference",
          description: "Academic gathering to discuss recent research and developments.",
          logo: Conference
        },
        "seminar": {
          name: "Seminar",
          description: "Educational session led by experts to share knowledge.",
          logo: Seminar
        },
        "mou": {
          name: "MOU",
          description: "Agreement for collaboration between institutions or industry partners.",
          logo: MOU
        }
      }
    },
  
    "other": {
      name: "All College Activities",
      logo: College,
      description: desc,
      activity: {
        "workshop": {
          name: "Workshop",
          description: "Hands-on session to enhance specific skills or knowledge.",
          logo: Workshop
        },
        "bootcamp": {
          name: "Bootcamp",
          description: "Intensive training program to master new skills quickly.",
          logo: Bootcamp
        },
        "alumini_meet": {
          name: "Alumini Meet",
          description: "Gathering of former students to reconnect and network.",
          logo: Alumini
        },
        "industrial_visit": {
          name: "Industrial Visit",
          description: "Educational tour to industries for practical exposure.",
          logo: Industrial
        },
        "hackathon": {
          name: "Hackathon",
          description: "Time-bound coding event to build innovative tech solutions.",
          logo: Hackathon
        },
        "guest_lecture": {
          name: "Guest Lecture",
          description: "Expert talk to share knowledge and real-world experiences.",
          logo: Guest
        },
        "day_celebration": {
          name: "Day Celebration",
          description: "Festive event celebrating special days and themes.",
          logo: Celebration
        },
        "important_exam": {
          name: "National Exam",
          description: "Competitive exam crucial for academic or career opportunities.",
          logo: Exam
        }
      }
    },
  
    "tyro": {
      name: 'TYRO Club',
      description: tdesc,
      logo: Tyro,
      activity: {
        "zest": {
          name: "ZEST",
          description: "Cultural fest showcasing talents through music, dance, and drama.",
          logo: Zest
        },
        "techvyom": {
          name: "Techvyom",
          description: "Technical fest with events, competitions, and tech showcases.",
          logo: Techfest
        },
        "aamod": {
          name: "Aamod",
          description: "Sports fest promoting fitness, teamwork, and sportsmanship.",
          logo: Sports
        },
        "club_activity": {
          name: "Club Activity",
          description: "Interactive events organized regularly by student clubs.",
          logo: Club
        },
        "oath_ceremony": {
          name: "Oath Ceremony",
          description: "Formal event to induct new club members officially.",
          logo: Oath
        }
      }
    },
  
    "trust": {
      name: "SRMS Trust",
      description: desc,
      activity: {
        "scholarship": {
          name: "Trust Scholarship",
          description: "Financial aid awarded based on merit or need.",
          logo: Scholarship
        },
        "convocation": {
          name: "Convocation",
          description: "Formal ceremony celebrating graduation and academic achievements.",
          logo: Convocation
        }
      }
    }
  };
  