CREATE TABLE `users` (
  `userid` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `pass` varchar(255),
  `gmail` varchar(255),
  `avatar` varchar(255),
  `dayat` datetime
);

CREATE TABLE `UserReadChapters` (
  `userid` int,
  `chapterid` int
);

CREATE TABLE `levels` (
  `userid` int,
  `level` int,
  `progress` int
);

CREATE TABLE `UserFollowingComics` (
  `userid` int,
  `comicid` int
);

CREATE TABLE `tags` (
  `tagid` int,
  `tagname` varchar(255)
);

CREATE TABLE `comics_tags` (
  `comicid` int,
  `tagid` int
);

CREATE TABLE `Comics` (
  `id` int[pk],
  `name` nvarchar,
  `author` nvarchar,
  `status` int,
  `views` int
);

CREATE TABLE `Chapters` (
  `id` int[pk],
  `comicid` int,
  `comicLocalId` int,
  `name` varchar(255),
  `uploadTime` datetime
);

CREATE TABLE `ChapterImages` (
  `id` int[pk],
  `chapterid` int,
  `uri` varchar(255)
);

CREATE TABLE `TopicComments` (
  `id` int[pk]
);

CREATE TABLE `Comments` (
  `id` int[pk],
  `parent_id` int,
  `topic_id` int,
  `user_id` int,
  `content` varchar(255),
  `timestampe` time
);

CREATE TABLE `TopicComments_Comics` (
  `topic_id` int,
  `comic_id` int
);

CREATE TABLE `TopicComments_Chapters` (
  `topic_id` int,
  `chapter_id` int
);

CREATE TABLE `LastUpdatedComic` (
  `id` int[pk]
);

ALTER TABLE `TopicComments` ADD FOREIGN KEY (`id`) REFERENCES `TopicComments_Comics` (`topic_id`);

ALTER TABLE `Comics` ADD FOREIGN KEY (`id`) REFERENCES `TopicComments_Comics` (`comic_id`);

ALTER TABLE `TopicComments` ADD FOREIGN KEY (`id`) REFERENCES `TopicComments_Chapters` (`topic_id`);

ALTER TABLE `Chapters` ADD FOREIGN KEY (`id`) REFERENCES `TopicComments_Chapters` (`chapter_id`);

ALTER TABLE `UserFollowingComics` ADD FOREIGN KEY (`userid`) REFERENCES `users` (`userid`);

ALTER TABLE `users` ADD FOREIGN KEY (`userid`) REFERENCES `levels` (`userid`);

ALTER TABLE `UserReadChapters` ADD FOREIGN KEY (`userid`) REFERENCES `users` (`userid`);

ALTER TABLE `Chapters` ADD FOREIGN KEY (`id`) REFERENCES `UserReadChapters` (`chapterid`);

ALTER TABLE `Comics` ADD FOREIGN KEY (`id`) REFERENCES `Chapters` (`comicid`);

ALTER TABLE `Comics` ADD FOREIGN KEY (`id`) REFERENCES `comics_tags` (`comicid`);

ALTER TABLE `tags` ADD FOREIGN KEY (`tagid`) REFERENCES `comics_tags` (`tagid`);

ALTER TABLE `Chapters` ADD FOREIGN KEY (`id`) REFERENCES `ChapterImages` (`chapterid`);

ALTER TABLE `Comics` ADD FOREIGN KEY (`id`) REFERENCES `UserFollowingComics` (`comicid`);

ALTER TABLE `Comments` ADD FOREIGN KEY (`id`) REFERENCES `Comments` (`parent_id`);

ALTER TABLE `TopicComments` ADD FOREIGN KEY (`id`) REFERENCES `Comments` (`topic_id`);

ALTER TABLE `users` ADD FOREIGN KEY (`userid`) REFERENCES `Comments` (`user_id`);
