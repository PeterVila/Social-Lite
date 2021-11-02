set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" timestamptz(0) NOT NULL default now(),
	"avatarUrl" TEXT,
	"email" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."comments" (
	"userId" serial NOT NULL,
	"content" TEXT NOT NULL,
	"postId" serial NOT NULL,
	"createdAt" timestamptz(0) NOT NULL default now()
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."posts" (
	"userId" serial NOT NULL,
	"postId" serial NOT NULL,
	"postType" TEXT NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"caption" TEXT,
  "eventDate" timestamptz(0),
	"location" TEXT NOT NULL,
	"createdAt" timestamptz(0) not null default now(),
	CONSTRAINT "posts_pk" PRIMARY KEY ("postId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."eventAttendees" (
	"userId" serial NOT NULL,
	"postId" serial NOT NULL,
	"attendeeId" serial NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."chatroom" (
	"userId" serial NOT NULL,
	"message" TEXT NOT NULL,
	"createdAt" timestamptz(0) NOT NULL default now(),
	"chatroomName" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("postId");

ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "eventAttendees" ADD CONSTRAINT "eventAttendees_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "eventAttendees" ADD CONSTRAINT "eventAttendees_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("postId");

ALTER TABLE "chatroom" ADD CONSTRAINT "chatroom_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");





