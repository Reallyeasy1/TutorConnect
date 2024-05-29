# TutorConnect
Please don't flame my Orbital

Description:

Documentation:

To set up locally:

Install:
1. postgresSQL https://www.postgresql.org/download/
2. pgadmin4 https://www.pgadmin.org/download/pgadmin-4-windows/
3. Follow the following video to set up pgadmin: https://www.youtube.com/watch?v=_ER9jHiylAo

Type in command prompt
1. cd tutor-connect
   
2. create .env file
   
3. Write in .env file:
-> DATABASE_URL = "postgresql://postgres:{database_password}@localhost:5432/{database_name}?schema=public" (Follow the following instructions to set up prisma: https://www.youtube.com/watch?v=_ER9jHiylAo)
   
-> NEXTAUTH_SECRET = secret

-> NEXTAUTH_URL = http://localhost:3000

-> MAIL_HOST = "gmail"

-> MAIL_USERNAME = "{your own gmail}"

-> MAIL_PASSWORD="{Auto generated password}" (Refer to https://support.google.com/mail/answer/185833?hl=en for more details)
   
4. npm install

To run:
1. npm run dev


Use Cases: TODO
