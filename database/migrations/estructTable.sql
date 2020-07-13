
insert into status (name, created_on) values('Disable',now());
insert into status (name, created_on) values('Enable',now());

insert into project_type (name, created_on) values('Micro Serverless',now());
insert into project_type (name, created_on) values('Smart Serverless',now());
insert into project_type (name, created_on) values('Mockable API',now());
insert into project_type (name, created_on) values('Push Center',now());
insert into project_type (name, created_on) values('Track and Tag',now());
insert into project_type (name, created_on) values('Smart Monitor',now());
insert into project_type (name, created_on) values('A/B Deep Testing',now());


insert into projects (bundle, type,name, owner, created_on, status) 
values('app-cea',now());


select * from projects;