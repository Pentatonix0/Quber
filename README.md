# Quber - Платформа для создания квестов по программированию

[![Демо](https://img.shields.io/badge/Демо-сайт-blue?style=for-the-badge&logo=google-chrome)](https://pentatonix0.space)

Платформа для создания и прохождения интерактивных квестов по программированию с возможностью организации учебных классов и отслеживания прогресса.

## Основные возможности

🎯 **Создание квестов**  
Разрабатывайте многоуровневые задания с проверкой кода  
📚 **Учебные классы**  
Организуйте студентов и отслеживайте их прогресс  
💻 **Редактор кода**  
Встроенная среда разработки с поддержкой 20+ языков  
🛠️ **Встроенная компиляция**  
Мгновенное выполнение кода на сервере  
✅ **Автотестирование**  
Мгновенная проверка решений через систему тестирования

## Установка

1. Клонируйте репозиторий

```
git clone https://github.com/Pentatonix0/Quber.git
```

2. Создайте .env файл

```
cd Quber/backend
nano .env
```

3. Установите значения (пример)

```
SECRET_KEY=0dea1f18d9c570e676587436
SQLALCHEMY_TRACK_MODIFICATIONS=True
```

4. Отредактируйте nginx.conf

```
cd ..
nano nginx.conf
```

5. Запустите сервис

```
docker compose up --build
```
