-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 22 2020 г., 20:29
-- Версия сервера: 10.3.13-MariaDB-log
-- Версия PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `php_test`
--

-- --------------------------------------------------------

--
-- Структура таблицы `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `login` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `admins`
--

INSERT INTO `admins` (`id`, `login`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Структура таблицы `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `wins` varchar(100) NOT NULL,
  `timeToStart` varchar(100) NOT NULL,
  `dateToStart` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `games`
--

INSERT INTO `games` (`id`, `wins`, `timeToStart`, `dateToStart`) VALUES
(1, '', '10:5', '10:5'),
(2, '', '10:5', '10:5'),
(3, '', '11', '11'),
(4, '', '12:03', '0123-03-12');

-- --------------------------------------------------------

--
-- Структура таблицы `hints`
--

CREATE TABLE `hints` (
  `id` int(11) NOT NULL,
  `num` int(11) NOT NULL,
  `id_game` int(11) NOT NULL,
  `id_task` int(11) NOT NULL,
  `text_hint` text NOT NULL,
  `minute_to_hint` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `hints`
--

INSERT INTO `hints` (`id`, `num`, `id_game`, `id_task`, `text_hint`, `minute_to_hint`) VALUES
(1, 1, 1, 1, '1 Подсказка к 1 задаче', '{\r\n\r\n\"minute\": 0,\r\n\r\n\"second\": 5\r\n\r\n}'),
(2, 2, 1, 1, '2 Подсказка к 1 задаче', '{\r\n\r\n\"minute\": 0,\r\n\r\n\"second\": 15\r\n\r\n}'),
(3, 1, 1, 2, '1 Подсказка ко 2 задаче', '{  \"minute\": 12,  \"second\": 45  }');

-- --------------------------------------------------------

--
-- Структура таблицы `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `num` int(11) NOT NULL,
  `id_game` int(11) NOT NULL,
  `text` text NOT NULL,
  `photo` varchar(100) NOT NULL,
  `video` varchar(100) NOT NULL,
  `answers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tasks`
--

INSERT INTO `tasks` (`id`, `num`, `id_game`, `text`, `photo`, `video`, `answers`, `time`) VALUES
(1, 1, 1, 'Текст к 1 заданию', '', '', '[\"AnsWeR 1\",\"answer 2\",\"answer 3\",\"answer 4\"]', '15'),
(2, 2, 1, 'Текст ко 2 заданию', '', '', '[\r\n\"a 1\"\r\n]', '');

-- --------------------------------------------------------

--
-- Структура таблицы `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `code` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `id_captain` int(11) NOT NULL,
  `captain_name` varchar(100) NOT NULL,
  `id_game` int(11) NOT NULL,
  `active_task` int(11) NOT NULL,
  `active_hint` int(11) NOT NULL,
  `time_to_next_hint` varchar(100) NOT NULL,
  `total_true_answers` int(11) NOT NULL,
  `total_false_answers` int(11) NOT NULL,
  `entered_answers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `teams`
--

INSERT INTO `teams` (`id`, `code`, `name`, `id_captain`, `captain_name`, `id_game`, `active_task`, `active_hint`, `time_to_next_hint`, `total_true_answers`, `total_false_answers`, `entered_answers`) VALUES
(1, '12', 'team 1', 1, 'User 1', 1, 1, 1, '{\"minute\":4,\"second\":0}', 137, 22, ''),
(2, '134', 'team 2', 2, 'User 2', 0, 1, 0, '{\r\n\"minute\": 12,\r\n\"second\": 45\r\n}', 101, 16, ''),
(7, 'IZTM6', '123', 1, 'user', 1, 2, 0, '{\"minute\":6,\"second\":10}', 0, 0, '[]'),
(8, 'ZLR32', '123', 3, 'user1', 0, 1, 0, '{}', 0, 0, '[]');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `activeGame` int(11) NOT NULL,
  `login` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `answerIsTrue` int(11) NOT NULL,
  `answerIsFalse` int(11) NOT NULL,
  `totalAnswerIsTrue` int(11) NOT NULL,
  `totalAnswerIsFalse` int(11) NOT NULL,
  `id_team` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `activeGame`, `login`, `password`, `answerIsTrue`, `answerIsFalse`, `totalAnswerIsTrue`, `totalAnswerIsFalse`, `id_team`) VALUES
(1, 1, '11', '11', 0, 0, 0, 0, 1),
(3, 0, 'user1', 'user', 0, 0, 0, 0, 0),
(4, 0, 'user2', 'user', 0, 0, 0, 0, 0),
(5, 1, 'user3', 'user', 0, 0, 0, 0, 7);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `hints`
--
ALTER TABLE `hints`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `hints`
--
ALTER TABLE `hints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
