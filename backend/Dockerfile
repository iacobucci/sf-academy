FROM python:3.12

# Configure Poetry
ENV POETRY_VERSION=1.7.1

RUN pip install -U pip setuptools \
    pip install poetry==${POETRY_VERSION}

WORKDIR /app
COPY . .

RUN poetry install

CMD [ "poetry", "run", "runserver" ]
