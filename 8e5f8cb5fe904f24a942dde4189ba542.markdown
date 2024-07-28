![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image14.png){width="3.151042213473316in"
height="3.159377734033246in"}

**NUS Orbital 2024**

**Milestone 3**

**TutorConnect**

Lo Yong Zhe

Low Tse Wei, Ethan

# Contents

[**Contents 2**](#contents)

[**Proposed Level of Achievement 4**](#proposed-level-of-achievement)

[**Aim 4**](#aim)

[**Motivation 4**](#motivation)

[**Vision 4**](#vision)

[**User Stories 5**](#user-stories)

[**Features 6**](#features)

> [User Account Authentication \[Completed\]
> 6](#user-account-authentication-completed)
>
> [Description 6](#description)
>
> [Diagrams 6](#diagrams)
>
> [Onboarding (Tutor side) \[Completed\]
> 9](#onboarding-tutor-side-completed)
>
> [Description 9](#description-1)
>
> [Posting Assignments (Client Side) \[Completed\]
> 11](#posting-assignments-client-side-completed)
>
> [Description 11](#description-2)
>
> [Applying for Assignments (Tutor Side) \[Completed\]
> 13](#applying-for-assignments-tutor-side-completed)
>
> [Description 13](#description-3)
>
> [Google Maps API (Tutor Side) \[Completed\]
> 14](#google-maps-api-tutor-side-completed)
>
> [Description 14](#description-4)
>
> [Tutor Filter Assignments \[Completed\]
> 15](#tutor-filter-assignments-completed)
>
> [Description 15](#description-5)
>
> [Integrated Messaging System \[Completed, only works locally\]
> 16](#integrated-messaging-system-completed-only-works-locally)
>
> [Description 16](#description-6)
>
> [Searching and Matchmaking \[Only Searching Completed\]
> 17](#searching-and-matchmaking-only-searching-completed)
>
> [Description 17](#description-7)
>
> [Feedback and Review System \[Completed\]
> 19](#feedback-and-review-system-completed)
>
> [Description 19](#description-8)
>
> [Payment System \[Completed\] 21](#payment-system-completed)
>
> [Client Notifications: 22](#client-notifications)
>
> [Tutor Notifications: 22](#tutor-notifications)
>
> [Client Notifications: 23](#client-notifications-1)
>
> [Tutor Notifications: 24](#tutor-notifications-1)

[**Software Engineering Principles
27**](#software-engineering-principles)

> [Project Management using JIRA 27](#project-management-using-jira)
>
> [Github Branching 27](#github-branching)
>
> [Github Issues 28](#github-issues)
>
> [Vercel CI/CD Pipeline 29](#vercel-cicd-pipeline)

[**Navigation Flow 31**](#navigation-flow)

> [Navigation Flow (Client) 31](#navigation-flow-client)
>
> [Navigation Flow (Tutor) 32](#navigation-flow-tutor)

[**Wireframing 33**](#wireframing)

[**Entity Relationship Diagram 34**](#entity-relationship-diagram)

[**User Interface Design 35**](#user-interface-design)

[**System Design 37**](#system-design)

[**Testing 38**](#testing)

> [Unit Testing 38](#unit-testing)
>
> [User Acceptance Testing 39](#user-acceptance-testing)

[**Known Bugs/Issues 40**](#known-bugsissues)

[**Timeline and Development Plan 41**](#timeline-and-development-plan)

# Proposed Level of Achievement

Apollo 11

# Aim 

We hope to:

-   Provide a centralized platform for students and parents to easily
    > find qualified tutors based on their individual needs and
    > preferences.

-   Streamline the tutor-student matching process by leveraging
    > personalized matching algorithms and communication tools.

-   Enhance the overall learning experience by fostering collaboration,
    > accountability, and support within the educational community.

# Motivation

As the demand for personalised education and academic support continues
to rise, driven by diverse learning paces, intricate subjects, and
unique academic objectives, a pressing challenge emerges in finding
suitable tutors amidst limited availability and the difficulty of
assessing tutor credibility. To address these obstacles, technological
advancements offer a promising solution through the creation of a
centralized platform. This platform connects students and parents with
qualified tutors tailored to individual needs, preferences, and academic
goals. By leveraging technology, this initiative enhances the overall
learning experience while fostering a collaborative educational
community, empowering learners to achieve their full potential.

# Vision

TutorConnect envisions a world where personalized education is
accessible to every student, regardless of their unique learning needs
and goals. By creating a centralized platform that seamlessly connects
students and parents with qualified tutors, TutorConnect aims to
revolutionize the tutoring landscape. Our mission is to leverage
advanced technology, including machine learning and secure communication
tools, to provide tailored matches and facilitate effective,
transparent, and engaging learning experiences. We strive to foster a
collaborative educational community that empowers students to achieve
their full potential and supports tutors in delivering high-quality,
impactful instruction.

# User Stories

1.  As a parent who wants to find the perfect tutor for my child's
    > academic needs, I want to be able to create a detailed profile
    > outlining my preferences and requirements.

2.  As a parent who is looking for a tutor for my child, I want to be
    > able to search and browse through a diverse pool of tutors based
    > on various criteria such as subject expertise, availability, and
    > ratings.

3.  As a parent who wants personalized matchmaking, I want to be able to
    > utilize advanced algorithms to facilitate optimal matches with
    > tutors who align with my unique needs and goals.

4.  For both parents and tutors who want seamless communication, an
    > integrated messaging system can be implemented to discuss tutoring
    > arrangements, schedule sessions, and clarify any questions or
    > concerns.

5.  Parents are given the option to provide feedback on their tutors,
    > either via rating them based on the number of stars or via
    > comments. If comments were given, we can perform sentiment
    > analysis to gauge the ratings of the tutor. This helps to maintain
    > the quality of tutoring services and inform other users\'
    > decisions, ensuring transparency and accountability.

6.  Secure payment options for paying of one-time matchmaking fee.
    > Shopee Paynow system.

**Deployment Guide:**

**Deployment Link:**
[[https://tutorconnect-delta.vercel.app/]{.underline}](https://tutorconnect-delta.vercel.app/)

**Project Management:**

[[https://loyongzhe.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog]{.underline}](https://loyongzhe.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog)

**Poster**

[[https://www.canva.com/design/DAGL9yXYo1k/aMHbsgyCR1Sj\--Tkokn8nw/edit?utm_content=DAGL9yXYo1k&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton]{.underline}](https://www.canva.com/design/DAGL9yXYo1k/aMHbsgyCR1Sj--Tkokn8nw/edit?utm_content=DAGL9yXYo1k&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image34.png){width="5.2817104111986in"
height="7.473958880139983in"}

# Features

## User Account Authentication \[Completed\]

### Description

TutorConnect requires both tutors and clients to have his/her own unique
account.

TutorConnect has implemented 1 main sign-in method:

1.  Email and password

Utilising NextAuth, users are able to:

-   Log in via email and password

-   Create an account if the user does not have an existing account

-   Reset password (a link will be sent to the given email to redirect
    > the user to the reset password page)

Based on the user\'s actions, the appropriate call to the local
PostgreSQL database is made. Registering as a client or user will update
the respective database, with invalid fields being highlighted with an
error message. Upon successful email verification, the user will be
redirected to the respective login page.

When logging in, the system will query the database to check if the
user\'s email exists. If it does, the system will verify the password.
If either the email or password is incorrect, an error message will be
displayed.

If a user forgets their password, they can reset it using the \"Forgot
password?\" link.

Upon successful login, users will be routed to their respective home
pages.

### Diagrams

### **Client Authentication Flow**![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image32.png){width="5.764371172353456in" height="7.713542213473316in"}

**Tutor Authentication Flow**

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image27.png){width="6.5in"
height="8.680555555555555in"}

## Onboarding (Tutor side) \[Completed\]

### Description

After registering, tutors can further enhance their profiles to increase
their success rate by completing the following sections:

1.  **Short Introduction**:

    -   Provide a brief introduction about yourself, highlighting
        > personal qualities such as patience, kindness, and
        > responsibility.

    -   Describe your teaching styles and methodologies, including your
        > approach to interactive learning and how you tailor lessons to
        > individual student needs.

2.  **Summary of Teaching Experience and Academic Achievements**:

    -   Detail your teaching experience, including schools, tuition
        > centres, and the number of students you have taught.

    -   Highlight your academic achievements, such as degrees earned,
        > placements on the Dean\'s List, and scholarships received.

    -   Mention any relevant certifications or specialised training that
        > enhance your teaching credentials.

3.  **Student Success Stories**:

    -   Share past grades and improvement records of previous students,
        > emphasising significant improvements and success stories.

    -   Provide specific examples of students who achieved high scores
        > or overcame challenges under your guidance.

4.  **Testimonials**:

    -   Upload testimonials from past students and parents to provide
        > social proof of your effectiveness as a tutor.

    -   Testimonials should highlight your impact on students\' academic
        > performance, your teaching style, and your ability to inspire
        > and motivate learners.

By thoroughly completing these sections, tutors can create a compelling
and comprehensive profile that showcases their expertise and dedication,
thereby increasing their chances of being matched with suitable
assignments and attracting more clients.

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image2.png){width="6.5in"
height="8.791666666666666in"}

## Posting Assignments (Client Side) \[Completed\]

### Description

**Step 1: Redirect to Assignment Form**

When a client (student or parent) wishes to post an assignment, they are
redirected to a user-friendly form. This form is designed to capture all
necessary details about the assignment, split under two sections:

**Section 1: Lesson Details**\
Here, clients are required to provide the following details such as:

1.  Level

2.  Subject

3.  Address and Postal Code (automatically filled in)

4.  Minimum and Maximum Hourly Rate

5.  Duration of lesson

6.  Frequency of lesson

7.  Additional Details

**Section 2: Tutor Details**

In this section, clients can indicate the kind of tutor that they are
looking for:

1.  Type of Tutor

2.  Gender Preference

3.  Race Preference

4.  Availability

**Step 2: Navigation and Confirmation**

The form\'s navigation and confirmation feature allows clients to
seamlessly move back and forth through the form, providing an
opportunity to review their inputs at each stage. If any discrepancies
or omissions are identified, clients can easily navigate back to the
relevant sections to make necessary corrections before finalising their
submission. This process not only enhances the user experience by
providing flexibility and control but also ensures that all details are
meticulously reviewed and confirmed, leading to more accurate and
complete submissions.

**Step 3: Database Upload and Tutor Visibility**

Once the client confirms the assignment details, the information is
uploaded to our secure database. Tutors registered on the TutorConnect
platform can then view the posted assignments. The assignment details
are displayed to tutors, enabling them to apply for the assignments that
match their expertise and availability. This streamlined process ensures
that assignments are quickly matched with suitable tutors, facilitating
efficient and effective learning experiences for students.

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image7.png){width="4.02950021872266in"
height="6.1740518372703415in"}

##  

## Applying for Assignments (Tutor Side) \[Completed\]

### Description

**Applying for Assignments**

**Step 1: Viewing Available Assignments**

Tutors registered on the TutorConnect platform have access to a list of
available assignments. This list is tailored to display assignments that
match the tutors\' areas of expertise and availability, making it easy
for them to find opportunities that align with their skills and
schedules.

**Step 2: Selecting Interested Assignments**

Tutors can browse through the list of assignments and apply for those
that interest them. Each assignment listing includes key details such as
the subject, level of difficulty, specific requirements, preferred
schedule, and any additional notes provided by the client. Tutors can
filter assignments based on specific criteria such as level and subject,
ensuring they can find the most relevant opportunities.

**Step 3: Filling Out Application Details**

When a tutor decides to apply for an assignment, they are prompted to
fill out a form with relevant details. This form allows tutors to
specify their proposed timing for the tutoring sessions and include any
additional information they believe is important, such as their teaching
approach, qualifications, and any questions they might have about the
assignment.

**Step 4: Submitting the Application**

After completing the application form, tutors submit their applications.
The system ensures that all required fields are filled out before
submission to maintain a smooth application process.

**Step 5: Client Review of Tutor Applications**

Once a tutor submits an application, the client who posted the
assignment receives a notification. The client can then review a list of
tutors who have applied for their assignment, including the details
provided in each application. This allows the client to compare
different tutors, evaluate their qualifications and proposed schedules,
and select the tutor that best fits their needs. This transparent and
interactive process ensures that clients can make informed decisions
when choosing the right tutor for their assignments.

## Google Maps API (Tutor Side) \[Completed\]

### Description

On the TutorConnect platform, tutors can seamlessly view all available
tuition assignments using an interactive Google Maps interface. This
feature is designed to enhance the tutor\'s experience by providing a
visual and intuitive way to browse assignments, similar to the
experience offered by Airbnb for property listings.

**Key Features:**

> **Interactive Map View**: Tutors can see all available tuition
> assignments plotted on a Google Map, offering a geographical
> perspective of assignment locations.
>
> **Price Markers**: Each assignment is represented by a marker that
> displays the assignment\'s minimum rate, allowing tutors to quickly
> identify opportunities that meet their financial expectations.
>
> **Detailed Assignment Information**: Clicking on a marker reveals a
> detailed popup containing crucial information about the assignment,
> such as the subject, level, address, duration, frequency, maximum
> rate, and additional details. \[*Proposed*\]
>
> **Real-Time Updates**: The map updates in real-time, so tutors can see
> new assignments as they become available after refreshing, ensuring
> they never miss an opportunity.

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image25.jpg){width="6.5in"
height="2.15625in"}

## Tutor Filter Assignments \[Completed\]

### Description

The filter feature is designed to streamline the process of finding
relevant assignments or tutoring sessions by allowing users to select
specific criteria from dropdown menus. Tutors can select an educational
level and several corresponding subjects, which then dynamically update
the displayed assignment cards to match the selected filters. The Google
Map on the right side will also be updated to display the rates of the
filtered assignments, offering a visual representation of assignment
locations, enhancing the user\'s ability to make informed decisions.
This feature simplifies the search process, making it more efficient and
user-friendly.

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image25.jpg){width="6.5in"
height="3.1527777777777777in"}

##  

## Integrated Messaging System \[Completed, only works locally\]

### Description

Integrate a messaging system to facilitate seamless communication
between students and tutors for discussing tutoring arrangements,
scheduling sessions, and addressing queries.

**Key features:**

1.  **Real-Time Messaging:**

> Engages users in prompt, dynamic conversations with instant
> notifications.

2.  **User-Friendly Interface:**

> Offers an intuitive, organised layout for easy conversation
> management.

3.  **Message History:**

> Saves conversations for future reference.

**Chat System**

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image18.jpg){width="5.119792213473316in"
height="3.669938757655293in"}

## Searching and Matchmaking \[Only Searching Completed\]

### Description

**Searching and Matchmaking of Tutors and Clients**

**Step 1: Setting Preferences**

Both tutors and clients (students and parents) can set their preferences
to refine their search and matchmaking experience. Tutors can specify
their subject expertise, preferred teaching levels, availability, and
teaching styles. Similarly, clients can detail their specific
requirements, learning goals, preferred tutoring times, and any other
relevant preferences.

**Step 2: Advanced Search Functionality**

TutorConnect offers a robust search functionality that allows clients to
easily find tutors who meet their specific criteria. Clients can search
for tutors based on various parameters, including:

-   Subject expertise

-   Level of education (e.g., primary, secondary, university level)

-   Availability (days and times)

-   Location (if in-person sessions are preferred)

-   Ratings and reviews from previous students

The search results are displayed in a user-friendly manner, making it
easy for clients to browse through the profiles of potential tutors.

**Step 3: Personalized Matchmaking Algorithms with Machine Learning**

To enhance the search experience, TutorConnect utilizes personalized
matchmaking algorithms powered by advanced machine learning techniques,
including reinforcement learning and collaborative filtering.

\- Reinforcement Learning: This technique allows the system to learn and
improve its matchmaking process over time by receiving feedback on the
quality of matches. Each successful match reinforces the criteria used,
while less successful matches provide data for adjustment, continually
refining the accuracy of future recommendations.

\- Collaborative Filtering: This method analyzes the preferences and
behaviors of both tutors and clients. By identifying patterns and
similarities in past interactions, the system can suggest tutors to
clients who have similar preferences and requirements, and vice versa.
This approach leverages the collective data to enhance individual match
suggestions.

By combining these techniques, the system can:

-   Identify patterns and preferences from past successful matches

-   Continuously learn and improve the accuracy of match suggestions

-   Suggest the most suitable tutor matches for each client based on a
    > comprehensive analysis of their profiles and preferences

**Step 4: Viewing Tutor Profiles**

Clients can click on individual tutor profiles to view detailed
information, including:

-   Tutor\'s qualifications and certifications

-   Teaching experience and specialties

-   Availability calendar

-   Student reviews and ratings

-   Personal introduction and teaching philosophy

This comprehensive view helps clients make informed decisions about
which tutors might be the best fit for their needs.

##  

## Feedback and Review System \[Completed\]

### Description

Develop a feedback and review system where users can provide ratings and
reviews after each tutoring session, enhancing transparency and
accountability within the community.

**Key features:**

1.  **Detailed reviews**

> In addition to ratings, users can write detailed reviews about their
> experiences, offering insights into the tutor\'s teaching style,
> effectiveness, and overall interaction.

2.  **Aggregate Scores/ Publicly Visible Ratings**

> Tutors receive an aggregate score based on all received ratings,
> giving a clear overview of their overall performance and reliability.

3.  **Anonymous Feedback**

> Users have the option to provide feedback anonymously, encouraging
> honest and constructive reviews without fear of repercussions.

4.  **Review Filtering**

> Users can filter reviews by date, rating, or keyword, making it easier
> to find relevant feedback.

**Features to be considered:**

1.  **Session ratings**

> Users can rate their tutoring sessions on a scale, providing a quick
> and straightforward way to assess the quality of the tutoring.

2.  **Sentiment Analysis**

> The system can perform sentiment analysis on written reviews to gauge
> overall user satisfaction, helping to highlight particularly positive
> or negative experiences.

**Tutor Search and Tutor Profile:**

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image4.png){width="3.057292213473316in"
height="2.185064523184602in"}![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image13.png){width="3.3254571303587053in"
height="1.8593952318460192in"}

**Review System and Request Function:**

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image28.png){width="3.1112456255468066in"
height="2.2920122484689416in"}
![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image9.png){width="3.1979254155730534in"
height="2.2679647856517935in"}

##  

## Payment System \[Completed\]

**Description:**

The payment system is designed to facilitate the payment of fees between
tutors and clients on the TutorConnect platform, ensuring secure,
efficient, and transparent transactions.

**Key Features:**

1.  **Secure Payment Gateway:**

> Utilises PCI-compliant payment gateways to ensure that all
> transactions meet industry standards for financial data protection and
> security.

2.  **PayNow Integration:**

> Supports PayNow for easy and convenient transactions, providing users
> with a popular and trusted payment method.

3.  **Transaction Confirmation:**

> Provides immediate confirmation of successful payments, ensuring that
> users are promptly informed of their transaction status.

4.  **Payment Receipts:**

> Generates digital receipts for all transactions, which can be accessed
> and downloaded by users for their records, ensuring transparency and
> easy record-keeping.

5.  **Data Encryption:**

> Ensures that all sensitive payment information is encrypted during
> transmission and storage, protecting user data from potential breaches
> and maintaining privacy.

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image17.jpg){width="3.338542213473316in"
height="2.238863735783027in"}![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image10.png){width="3.0677088801399823in"
height="2.024861111111111in"}

**Notification System \[Completed\]**

The notification feature in TutorConnect is designed to keep both tutors
and clients promptly informed about important updates, with
functionality to manage notifications efficiently. The alerts provided
by this feature include:

### Client Notifications:

1.  **Tutor Applies for Assignment:**

    -   Clients receive: {tutor.name} has applied for your assignment.

    -   Ensures clients are aware when a tutor is interested in their
        > assignment.

2.  **Tutor Accepts Assignment:**

    -   Clients receive: {tutor.name} has accepted your offer for
        > Assignment #{assignment.id}. Please proceed to make payment
        > for the one-time matchmaking fee.

    -   Notifies clients immediately when a tutor accepts their
        > assignment, prompting them to proceed with payment.

3.  **Payment Received:**

    -   Clients receive: You can now contact the tutor, {tutor.name}, at
        > {tutor.contactNumber} to arrange the first lesson.

    -   Confirms that payment has been made, enabling clients to start
        > coordinating with the tutor.

4.  **Offer Rejected:**

    -   Clients receive: {tutor.name} has rejected your offer for
        > Assignment #{assignment.id}.

    -   Notifies clients that the tutor has rejected their offer and
        > prompts them to look for alternative tutors.

5.  **Request Rejected:**

    -   Clients receive: {tutor.name} has rejected your request for
        > Assignment #{assignment.id}.

    -   Notifies clients that the tutor has rejected their request.
        > Their assignment will then be made available for other tutors
        > to apply.

### Tutor Notifications:

1.  **Update Profile:**

    -   Reminds tutors to keep their profiles up to date for better
        > visibility and more opportunities.

2.  **Client Chooses Tutor:**

    -   Tutors receive: You have been picked for an assignment. Click
        > here to confirm your commitment.

    -   Informs tutors when they have been selected for an assignment,
        > requiring their confirmation to proceed.

3.  **Client Sends Request to Tutor:**

    -   Tutors receive: A client would like to request your services.
        > Click here to view the assignment details.

    -   Alerts tutors about new service requests from clients, providing
        > a link to view assignment details.

4.  **Client Has Made Payment:**

    -   Tutors receive: Client has made payment. You can contact the
        > client to arrange the first lesson.

    -   Notifies tutors of payment confirmation, allowing them to
        > arrange the first lesson with the client.

Each notification includes a read and unread status indicator, ensuring
users can easily track which alerts they have already seen. These
notifications also have interactive buttons for clients and tutors to
click on.

### Client Notifications:

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image16.png){width="5.619792213473316in"
height="3.0456911636045496in"}

### Tutor Notifications:

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image1.png){width="5.692708880139983in"
height="3.174780183727034in"}

**FAQ page \[Completed\]**

The FAQ page feature in TutorConnect is designed to provide users with
quick and easy access to important information and common queries. This
feature includes:

1.  **User-Specific FAQs:** The FAQ page dynamically switches between
    > client and tutor FAQs on the same page, ensuring that users see
    > relevant information based on their role.

2.  **Comprehensive Questions and Answers:** The page includes a wide
    > range of questions and detailed answers covering various aspects
    > of using the TutorConnect platform. Topics include account setup,
    > posting assignments, applying for assignments, payment processes,
    > and troubleshooting common issues.

3.  **Expandable Sections:** Each FAQ is presented in a collapsible
    > format, allowing users to click on a question to reveal the
    > answer. This keeps the page organized and user-friendly.

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image26.png){width="6.5in"
height="3.4166666666666665in"}

**Rates page \[Completed\]**

The tuition rates feature in TutorConnect is designed to offer
transparency and flexibility in pricing for tutoring services. Tutors
and clients can view the offered rates for each assignment before
applying/ posting assignments. This helps tutors/ clients to make
informed decisions based on their financial expectations and
availability.

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image19.png){width="6.5in"
height="4.055555555555555in"}

#  

# Software Engineering Principles

## Project Management using JIRA

Project management using JIRA leverages software engineering principles
to enhance productivity and efficiency in development workflows. In this
framework, milestones are translated into actionable sprints, each
representing a focused timeframe for completing specific tasks and
achieving predefined goals. Tasks within these sprints are meticulously
set, categorised, and assigned to team members based on their expertise
and capacity. Throughout the sprint cycle, progress on these tasks is
routinely monitored and tracked within JIRA\'s intuitive interface. Team
members update task statuses, mark milestones as completed, and raise
any blockers or issues promptly. This approach ensures transparency,
accountability, and alignment across the team, facilitating seamless
collaboration and timely delivery of project milestones.

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image15.png){width="5.817708880139983in"
height="2.396075021872266in"}

Link to PM Tool:
[[https://loyongzhe.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog]{.underline}](https://loyongzhe.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog)

## Github Branching

Branching in GitHub allows us to adhere to several key principles:

1.  **Isolation of Work**: Each GitHub branch represents a distinct line
    > of development, isolating changes and new features from the main
    > codebase. This isolation ensures that developers can work on
    > different aspects of the project simultaneously without
    > interfering with each other\'s code.

2.  **Collaboration and Code Review**: Branches facilitate collaborative
    > development by enabling team members to work independently on
    > tasks or features. Pull Requests (PRs) are used to merge changes
    > from branches back into the main branch after thorough review.
    > This process ensures that code quality is maintained through peer
    > review and that new features integrate smoothly with existing
    > code.

3.  **Version Control and Rollback**: GitHub branches support version
    > control, allowing developers to experiment with new ideas or fixes
    > without affecting the stable main branch. If issues arise, changes
    > can be reverted by rolling back to a previous commit or branch
    > state, ensuring project stability and minimising risks associated
    > with software updates.

4.  **Continuous Integration and Deployment (CI/CD)**: Branches are
    > integral to CI/CD pipelines, where automated tests and builds are
    > triggered on each branch and PR. This practice ensures that
    > changes are validated and integrated into the codebase regularly,
    > promoting a continuous delivery approach to software development.

5.  **Feature Development and Release Management**: GitHub branches are
    > pivotal in managing feature development and release cycles.
    > Feature branches can be created for specific features or
    > enhancements, and they are merged into the main branch once they
    > are completed and tested. This systematic approach helps in
    > organising project milestones and aligning development efforts
    > with product timelines.

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image22.png){width="4.765625546806649in"
height="1.9988057742782153in"}

## Github Issues

Using GitHub Issues in software engineering is a best practice due to
its ability to centralize task management and enhance team
collaboration. By utilising GitHub Issues, all project-related tasks,
bug reports, feature requests, and enhancements are recorded in one
place, providing a single source of truth for the entire team. This
centralized system ensures that everyone is aware of the project\'s
status, reducing confusion and miscommunication. Additionally, GitHub
Issues allow for detailed discussions on each issue, enabling team
members to collaborate effectively. They can comment, suggest
improvements, and provide feedback, fostering a collaborative
environment that enhances the overall quality of the project.

Moreover, GitHub Issues promote transparency and accountability within
the team. Each issue can be assigned to specific team members, making it
clear who is responsible for what task. This assignment feature helps in
tracking progress and ensuring that tasks are completed on time. The
visibility of each issue and its associated discussions also means that
all team members can see the project\'s progress and any potential
roadblocks. This transparency helps in the early identification of
issues and enables proactive problem-solving. Furthermore, the
historical record of issues and their resolutions serves as valuable
documentation for future reference, aiding in knowledge retention and
continuous improvement of the project.

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image29.png){width="6.5in"
height="2.0694444444444446in"}

## Vercel CI/CD Pipeline

Vercel provides a streamlined Continuous Integration and Continuous
Deployment (CI/CD) pipeline that integrates seamlessly with GitHub
repositories, making it a powerful tool for developers aiming to
automate their deployment processes. When a GitHub repository is
connected to Vercel, any push to the repository triggers an automatic
build and deployment process. This integration means that code changes
are quickly reflected in the live environment, promoting rapid iteration
and continuous delivery. The pipeline supports various frameworks and
static site generators, offering versatility for different web
development projects.

One of the standout features of Vercel\'s CI/CD pipeline is its
automatic preview deployments. For every pull request made in the GitHub
repository, Vercel generates a unique preview URL. This allows
developers and stakeholders to review changes in an environment that
closely mirrors production before merging them into the main branch.
These preview URLs facilitate better collaboration and quality
assurance, as they enable comprehensive testing and feedback on new
features and bug fixes before they go live. This ensures that any
potential issues are identified and resolved early in the development
process, enhancing the overall stability and reliability of the
application.

Moreover, Vercel\'s deployment pipeline offers the convenience of
instant rollbacks. If a deployment introduces bugs or issues, developers
can swiftly revert to a previous stable version with just a few clicks.
This capability is crucial for maintaining application uptime and
ensuring a smooth user experience, even in the face of unexpected
problems. By automating the build, deployment, and rollback processes,
Vercel\'s CI/CD pipeline significantly reduces the manual effort
involved in managing deployments, allowing developers to focus more on
writing code and less on operational concerns. This leads to more
efficient development cycles and faster delivery of high-quality web
applications.![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image3.png){width="6.5in"
height="2.1805555555555554in"}

# Navigation Flow

## Navigation Flow (Client)

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image33.png){width="6.5in"
height="5.680555555555555in"}

## Navigation Flow (Tutor)

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image31.png){width="6.5in"
height="5.319444444444445in"}

# Wireframing

# ![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image24.png){width="7.435269028871391in" height="5.47468394575678in"}

# **Entity Relationship Diagram**

**Overall
Diagram:**![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image11.png){width="6.795811461067367in"
height="6.47998031496063in"}

# User Interface Design

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image23.png){width="6.5in"
height="8.0in"}

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image30.png){width="6.5in"
height="8.833333333333334in"}

# System Design

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image8.png){width="6.5in"
height="5.680555555555555in"}

# Testing

Automated tests are essential to test features and fix bugs to ensure
the web app performs as expected. We plan to do unit testing,
integration testing and user acceptance testing. For unit testing, we
are using Jest to test the correctness of our program.

## Unit Testing

Unit testing involves writing tests to verify that individual units or
components of a software application function as expected. It ensures
that each part of the code performs correctly in isolation, facilitating
early detection of bugs and simplifying code maintenance.

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image5.png){width="6.5in"
height="1.6111111111111112in"}

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image12.png){width="6.5in"
height="1.4027777777777777in"}

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image21.png){width="6.5in"
height="1.5972222222222223in"}

## 

## User Acceptance Testing

Sent the link to a select group of people to use and used the channel/ a
google form to obtain feedback.

Link to Google Forms:
[[https://forms.gle/NQiVjD1oky2dvVUw7]{.underline}](https://forms.gle/NQiVjD1oky2dvVUw7)

Link to app:
[[https://tutorconnect-delta.vercel.app/]{.underline}](https://tutorconnect-delta.vercel.app/)

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image20.png){width="6.5in"
height="0.8598731408573929in"}

![](vertopal_8e5f8cb5fe904f24a942dde4189ba542/media/image6.png){width="6.5in"
height="5.208333333333333in"}

#  

# Known Bugs/Issues

  ------------------------------------------------------------------------------------------------------------------------------
  S/N   Bug/Issue Name   Description                                                          In-Charge   Date Fixed Status
  ----- ---------------- -------------------------------------------------------------------- ----------- ---------- -----------
  1     Nav Bar Profile  Updated profile picture is not reflected on the nav bar              Ethan       4/7/24     *Fixed and
        picture not                                                                                                  deployed*
        updated                                                                                                      

  2     Tutor            Calendar Month and Year options are not displayed correctly          Ethan       3/7/24     *Fixed and
        Registration                                                                                                 deployed*
        Calendar                                                                                                     

  3     Calendar display Currently displayed in MMDDYYYY, to change to DDMMYYYY               Ethan       5/7/24     *Fixed and
                                                                                                                     deployed*

  4     Buggy Filter     [Filter assignment may be buggy for assignments that are part of     Ethan       5/7/24     *Fixed and
        Assignment       filter assignment, especially for assignments that satisfy the                              deployed*
                         conditions](https://github.com/Reallyeasy1/TutorConnect/issues/23)                          

  5     Chat app not     Chat Switch Clients does not auto filter chat                        Yong Zhe    4/7/24     *Fixed and
        classifying                                                                                                  deployed*
        properly                                                                                                     
        sometimes                                                                                                    

  6     Chat app not     Chat does not differentiate between whether it\'s you or the         Yong Zhe    4/7/24     *Fixed and
        classifying      recipient                                                                                   deployed*
        properly                                                                                                     
        sometimes                                                                                                    

  7     Not getting      Must click Sign Out multiple times before getting signed out         Ethan       3/7/24     *Fixed and
        signed out                                                                                                   deployed*

  8     Chat app         Chat app displaying CORS Error when polling messages from server     Yong Zhe    4/7/24     *Not fixed,
        displaying CORS                                                                                              only works
        Error when                                                                                                   locally*
        polling messages                                                                                             
        from server                                                                                                  
  ------------------------------------------------------------------------------------------------------------------------------

# Timeline and Development Plan

+----+--------------+-----------------------+----------+--------------+
| S  | Tasks        | Description           | I        | Date         |
| /N |              |                       | n-Charge |              |
+====+==============+=======================+==========+==============+
| 1  | Finalise     | Plan out all the      | Ethan    | 11 May - 12  |
|    | ideas        | features, allocate    |          | May          |
|    |              | workload, set up      | Yong Zhe |              |
|    | *Completed*  | project and           |          |              |
|    |              | familiarise with the  |          |              |
|    |              | tech stack            |          |              |
+----+--------------+-----------------------+----------+--------------+
| 2  | User account | Register pages        | Ethan    | 13 May - 19  |
|    | aut          |                       |          | May          |
|    | hentication\ |                       |          |              |
|    | *Completed*  |                       |          |              |
+----+--------------+-----------------------+----------+--------------+
|    |              | Login pages           |          |              |
+----+--------------+-----------------------+----------+--------------+
|    |              | Email verification    |          | 23 May       |
+----+--------------+-----------------------+----------+--------------+
|    |              | Password reset        |          |              |
+----+--------------+-----------------------+----------+--------------+
| 3  | Post         | Post assignments      | Yong Zhe | 22 May       |
|    | assignment   | (client)              |          |              |
|    | feature\     |                       |          |              |
|    | *Completed*  |                       |          |              |
+----+--------------+-----------------------+----------+--------------+
|    |              | View posted           |          |              |
|    |              | assignments (client)  |          |              |
+----+--------------+-----------------------+----------+--------------+
| 4  | Designing of | Sketched wireframes   | Ethan    | 25 May       |
|    | web pages    |                       |          |              |
|    |              |                       | Yong Zhe |              |
|    | *Completed*  |                       |          |              |
+----+--------------+-----------------------+----------+--------------+
|    |              | Design UI using Figma |          | 25 May - 22  |
|    |              |                       |          | Jul          |
+----+--------------+-----------------------+----------+--------------+
| 5  | Apply for    | Tutors can apply for  | Yong Zhe | 29 May - 1   |
|    | assignments  | assignments + Clients |          | Jun          |
|    |              | can choose a tutor    |          |              |
|    | *Completed*  |                       |          |              |
+----+--------------+-----------------------+----------+--------------+
| 6  | User         | Develop navigation    | Ethan    | 30 May - 2   |
|    | Interface    | bar                   |          | Jun          |
|    |              |                       |          |              |
|    | *Completed*  |                       |          |              |
+----+--------------+-----------------------+----------+--------------+
|    |              | Home Page             |          | 30 May - 1   |
|    |              |                       |          | Jun          |
+----+--------------+-----------------------+----------+--------------+
|    |              | Update profile page   |          | 11 Jun - 16  |
|    |              |                       |          | Jun          |
+----+--------------+-----------------------+----------+--------------+
|    |              | Rates and FAQ pages   | Ethan    | 5 Jul - 6    |
|    |              |                       |          | Jul          |
|    |              |                       | Yong Zhe |              |
+----+--------------+-----------------------+----------+--------------+
| M  |              |                       |          | 3 Jun        |
| il |              |                       |          |              |
| es |              |                       |          |              |
| to |              |                       |          |              |
| ne |              |                       |          |              |
| 1: |              |                       |          |              |
| Id |              |                       |          |              |
| ea |              |                       |          |              |
| ti |              |                       |          |              |
| on |              |                       |          |              |
+----+--------------+-----------------------+----------+--------------+
| 7  | S            | Search for potential  | Ethan    | 8 Jul - 9    |
|    | earch/Filter | tutors (client)       |          | Jul          |
|    | feature      |                       |          |              |
|    |              |                       |          |              |
|    | *Completed*  |                       |          |              |
+----+--------------+-----------------------+----------+--------------+
|    |              | Filter for relevant   | Ethan\   | 24 Jun - 5   |
|    |              | assignments (tutor)   | Yong Zhe | Jul          |
+----+--------------+-----------------------+----------+--------------+
|    |              | Filter assignments    | Yong Zhe | 24 Jun       |
|    |              | (tutor)               |          |              |
+----+--------------+-----------------------+----------+--------------+
| 8  | Chat         | Implement a chat      | Yong Zhe | 15 Jun       |
|    | function     | feature for clients   |          |              |
|    |              | and tutors to connect |          |              |
|    | *Completed*  | (Left with bugs)      |          |              |
|    |              |                       |          |              |
|    | *(Works      |                       |          |              |
|    | Locally)*    |                       |          |              |
+----+--------------+-----------------------+----------+--------------+
| 9  | Refine User  | Touch up on all web   | Ethan    | 17 Jun - 1   |
|    | Interface    | pages                 |          | Jul          |
|    |              |                       |          |              |
|    | *Completed*  |                       |          |              |
+----+--------------+-----------------------+----------+--------------+
| 10 | Google Maps  | Use Google Maps API   | Ethan    | 23 Jun       |
|    | feature      | to display price      |          |              |
|    |              | points of all         |          |              |
|    | *Completed*  | available assignments |          |              |
+----+--------------+-----------------------+----------+--------------+
| M  |              |                       |          | 1 Jul        |
| il |              |                       |          |              |
| es |              |                       |          |              |
| to |              |                       |          |              |
| ne |              |                       |          |              |
| 2: |              |                       |          |              |
| P  |              |                       |          |              |
| ro |              |                       |          |              |
| to |              |                       |          |              |
| ty |              |                       |          |              |
| pe |              |                       |          |              |
+----+--------------+-----------------------+----------+--------------+
| 11 | Payment      | Use Paynow API for    | Ethan    | 19 Jul - 22  |
|    | system       | the one-time payment  |          | Jul          |
|    |              | of matchmaking fee    | Yong Zhe |              |
|    | *Completed*  |                       |          |              |
+----+--------------+-----------------------+----------+--------------+
| 12 | Matchmaking  | Develop ML algorithm  | \-       | \-           |
|    | model        | for recommending      |          |              |
|    |              | tutors/ clients       |          |              |
|    | *Did not     |                       |          |              |
|    | proceed due  |                       |          |              |
|    | to*          |                       |          |              |
|    |              |                       |          |              |
|    | *lack of     |                       |          |              |
|    | time.*       |                       |          |              |
+----+--------------+-----------------------+----------+--------------+
| 13 | Feedback and | Allow clients to rate | Ethan    | 8 Jul - 12   |
|    | review       | tutors after the      |          | Jul          |
|    | system       | completion of the     |          |              |
|    |              | assignment            |          |              |
|    | *Completed*  |                       |          |              |
+----+--------------+-----------------------+----------+--------------+
| 14 | Notification | Create a notification | Ethan    | 18 Jul - 22  |
|    | System       | system for clients    |          | Jul          |
|    |              | and tutors to receive |          |              |
|    | *Completed*  | updates               |          |              |
+----+--------------+-----------------------+----------+--------------+
| 15 | Refinement,  | Refine user           | Ethan    | 18 Jul - 25  |
|    | testing and  | experience and user   |          | Jul          |
|    | debugging    | interface             |          |              |
|    |              |                       |          |              |
|    | *Completed*  |                       |          |              |
+----+--------------+-----------------------+----------+--------------+
|    |              | Test the algorithm    | Yong Zhe | 4 Jul - 9    |
|    |              | extensively for bugs  |          | Jul          |
+----+--------------+-----------------------+----------+--------------+
| Ev |              |                       |          | 29 Jul       |
| al |              |                       |          |              |
| ua |              |                       |          |              |
| ti |              |                       |          |              |
| on |              |                       |          |              |
| M  |              |                       |          |              |
| il |              |                       |          |              |
| es |              |                       |          |              |
| to |              |                       |          |              |
| ne |              |                       |          |              |
| 3: |              |                       |          |              |
| E  |              |                       |          |              |
| xt |              |                       |          |              |
| en |              |                       |          |              |
| si |              |                       |          |              |
| on |              |                       |          |              |
+----+--------------+-----------------------+----------+--------------+
