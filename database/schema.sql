set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"displayName" TEXT NOT NULL,
	"createdAt" timestamptz(6) NOT NULL default now(),
	"avatarUrl" TEXT,
	"description" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."comments" (
  "messageId" serial NOT NULL,
	"userId" serial NOT NULL,
  "username" TEXT NOT NULL,
	"content" TEXT NOT NULL,
	"postId" INTEGER NOT NULL,
  "avatarUrl" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL default now()
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."posts" (
	"userId" serial NOT NULL,
  "avatarUrl" TEXT,
	"postId" serial NOT NULL,
  "postTitle" TEXT NOT NULL,
	"postType" TEXT NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"caption" TEXT,
  "eventDate" timestamptz,
  "endTime" timestamptz,
	"location" TEXT NOT NULL,
	"createdAt" timestamptz(6) not null default now(),
	CONSTRAINT "posts_pk" PRIMARY KEY ("postId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."eventAttendees" (
	"userId" serial NOT NULL UNIQUE,
	"postId" serial NOT NULL,
	"attendeeId" serial NOT NULL UNIQUE,
  "avatarUrl" TEXT NOT NULL,
	CONSTRAINT "eventAttendees_pk" PRIMARY KEY ("userId", "attendeeId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."chatroom" (
	"userId" serial NOT NULL,
	"message" TEXT NOT NULL,
	"createdAt" timestamptz(6) NOT NULL default now(),
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





