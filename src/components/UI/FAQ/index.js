import React from 'react';
import "./style.scss";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container, Grid } from '@mui/material';
const FAQ = () => {
  const faqData = [
    {
      section: "Registration",
      questions: [
        {
          question: "How can I register for the congress?",
          answer: `To register:
                  1. Log in to the attendance portal.
                  2. Complete all required fields to build your profile, including your username and password.
                  3. Select the congress you wish to attend by clicking on its name.
                  4. Continue filling out the registration form.
                  5. Submit the form and proceed to payment.`
        },
        {
          question: "How can I know if my registration is going well?",
          answer: "After completing your registration, you will receive an email within 24 hours confirming your registration and notifying you that your profile is now active."
        },
        {
          question: "How can I pay the registration fees?",
          answer: "After filling in the required details, the website will take you to the payment page. You can pay through AMEX, VISA CARDS, MASTER CARD, and PAYPAL."
        },
        {
          question: "What is included in the registration?",
          answer: "Conference Bag and Badge, Lunches and Coffee Breaks, Scientific Program, Access to Exhibition, CME Certificate."
        },
        {
          question: "How can I get the Badge and the Certificate?",
          answer: "You will receive a barcode in your email. You can show it at the entrance to get your Badge."
        },
        {
          question: "Can you please guide me on your website to do the required registration?",
          answer: "You can download the guides video [Link containing video]."
        }
      ]
    },
    {
      section: "Speakers",
      questions: [
        {
          question: "When will I get my user confirmation?",
          answer: "You will receive an email within 24 hours notifying you that your profile is now active."
        },
        {
          question: "How can I build my profile?",
          answer: "Go to the login portal, select the congress you wish to attend as a speaker, and then complete your profile."
        },
        {
          question: "How can I download my presentation?",
          answer: "In your profile, you can upload your presentation when setting up your profile. Alternatively, you can provide the presentation directly to the technical team by sending it via email or using a flash drive to upload it on-site."
        },
        {
          question: "My presentation is too big; how can I send it?",
          answer: "You can upload the presentation on our website; the maximum size will be [specify max size] per file. You will receive an email when we successfully receive it."
        },
        {
          question: "I want to download my presentation using your website; in what format should it be downloaded?",
          answer: "You can download it in PowerPoint or PDF format, and you can download your video also."
        },
        {
          question: "I have a video along with my presentation; where should I upload it, and in what format?",
          answer: "You can also upload it through our website in the same section where you upload your presentation. Please ensure the file is in MP4 format."
        },
        {
          question: "How long should my presentation be?",
          answer: "According to your time in the scientific program."
        },
        {
          question: "I made an edit to my presentation and need to send it again; what should I do?",
          answer: "You can re-upload your presentation by clicking the update button on your profile, and you will receive a confirmation email or notification accordingly."
        },
        {
          question: "Can I test my presentation before my lecture time?",
          answer: "Sure, you can test it 5 to 10 minutes before your lecture time at the technician's desk."
        },
        {
          question: "If I participate virtually, when will I receive the Zoom link?",
          answer: "You will receive the Zoom link at least 24 hours before the congress date, and a notification will be sent to your profile."
        },
        {
          question: "I have a special requirement during my lecture, such as needing 2 laptops, a whiteboard, printed documents, etc. What should I do?",
          answer: "You must inform us two weeks in advance by sending us an email titled 'Special lecture requirement.' Our email: coordinator@eventscons.com"
        },
        {
          question: "I want to cancel my attendance; what are the procedures?",
          answer: "You must inform us one month in advance by using the cancellation button in your profile."
        },
        {
          question: "If I have a video presentation, do I have to prepare a PowerPoint slideshow? Are there any requirements for the slides?",
          answer: "If you need to prepare a PowerPoint slideshow, you will receive an email to inform you of any requirements or templates to be used."
        },
        {
          question: "I was wondering if I could give my lecture via the internet (e.g., Zoom, Webex, or any other provider you prefer). Is that possible?",
          answer: "If a virtual session becomes available, we will email you with the details. You can then update your profile to confirm whether you will attend in person or virtually."
        },
        {
          question: "Can you please guide me on your website to download my presentation and do the required registration?",
          answer: "You can download the guides video [Link containing video]."
        }
      ]
    },
    {
      section: "Abstract",
      questions: [
        {
          question: "How can I submit my abstract?",
          answer: "Go to your profile, upload, or write your abstract."
        },
        {
          question: "When will I get the abstract confirmation?",
          answer: "You will receive a confirmation email or notification on your profile."
        },
        {
          question: "How can I know if my abstract has been accepted?",
          answer: "After submitting your abstract, you will receive a notification confirming that it is under review by the congress scientific committee."
        },
        {
          question: "If my abstract is accepted as a poster, how can I know the exact dimensions?",
          answer: "The dimensions for the poster are 50 cm x 70 cm."
        },
        {
          question: "What is the language for the abstract submission?",
          answer: "All abstracts must be submitted in English using the online submission form on the website."
        },
        {
          question: "What is the structure for the abstract?",
          answer: "- The title must be brief, concise, and in CAPITAL LETTERS.\n- Authors: Please enter your name and your colleagues’ names as you wish them to appear in the Final Program.\n- The abstract text should have a maximum of 200 words."
        },
        {
          question: "I have sent my abstract, but I want to make a modification; what should I do?",
          answer: "You must inform us one month in advance by using the abstract modification button in your profile."
        },
        {
          question: "How can I know the exact deadlines for abstract submission?",
          answer: "You will receive an email with all the required information and deadlines."
        },
        {
          question: "If my abstract is accepted, will I receive a certificate?",
          answer: "Yes, you will receive an abstract certificate after the congress ends, which will be sent to your email."
        },
        {
          question: "Can you please guide me on your website to do the required registration?",
          answer: "You can download the guides video [Link containing video]."
        }
      ]
    }
  ];
  return (
    <Container
    sx={{
      marginTop:'10px'
    }}
    >
      <Grid container
      sx={{
        justifyContent:'center',
        alignItems:'center',
        display:'flex'
      }}
      >
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>

        </Grid>
      </Grid>
      {faqData.map((section, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            {section.section}
          </AccordionSummary>
          {section.questions.map((question, idx) => (
            <Accordion key={idx}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${idx}-content`}
                id={`panel${idx}-header`}
                sx={{
                  backgroundColor:'rgba(0, 0, 0, 0.09)',

                }}
              >
            {question.question}
            </AccordionSummary>
            <AccordionDetails key={idx}>
              
              {question.answer.split("\n").map((line, lineIdx) => (
                  <p key={lineIdx}>{line}</p>
                ))}
            </AccordionDetails>


            </Accordion>
           
          ))}
        </Accordion>
      ))}
    </Container>
    

      
  );
};

export default FAQ;
