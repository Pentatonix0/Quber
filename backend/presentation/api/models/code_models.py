from flask_restx import Namespace, fields


class CodeDTO:
    api = Namespace('code', description="A namespace for code running")

    # Модель для отправки кода на выполнение
    code_model = api.model(
        'Code',
        {
            "source_code": fields.String(description="Исходный код программы"),
            "language_id": fields.Integer(description="ID языка программирования"),
            "stdin": fields.String(description="Входные данные для программы"),
            "cpu_time_limit": fields.Integer(description="Лимит процессорного времени (сек)"),
            "memory_limit": fields.Integer(description="Лимит памяти (KB)"),
            "stack_limit": fields.Integer(description="Лимит стека (KB)"),
            "max_processes_and_or_threads": fields.Integer(description="Максимальное количество процессов/потоков"),
        })

    # Модель статуса выполнения
    status_model = api.model(
        'Status',
        {
            "id": fields.Integer(description="ID статуса"),
            "description": fields.String(description="Описание статуса"),
        })

    # Модель ответа с результатами выполнения
    response_model = api.model(
        'CodeResponse',
        {
            "stdout": fields.String(description="Стандартный вывод программы"),
            "time": fields.String(description="Затраченное время (сек)"),
            "memory": fields.Integer(description="Использованная память (KB)"),
            "stderr": fields.String(description="Ошибки выполнения"),
            "token": fields.String(description="Уникальный идентификатор выполнения"),
            "compile_output": fields.String(description="Вывод компилятора"),
            "message": fields.String(description="Сообщение об ошибке"),
            "status": fields.Nested(status_model, description="Статус выполнения"),
        })
