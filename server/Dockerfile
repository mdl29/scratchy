FROM python:3.8-slim-buster

#RUN groupadd -r scratchy && useradd -m -g scratchy scratchy
#USER scratchy

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .
RUN pip3 install -e .

ENV FLASK_APP=scratchy_server.app
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
