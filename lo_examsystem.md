create table user(
    u_id int primary key auto_increment,
    u_name varchar(16) not null,
    u_email varchar(25) not null unique,
    u_pass varchar(16) not null,
    p_id int,
    foreign key(p_id) references profession(p_id)
)engine=innodb auto_increment=1000 default charset=utf8;


create table profession(
    p_id int primary key auto_increment,
    p_name varchar(20) not null unique
)engine=innodb default charset=utf8;


create table testpaper(
    t_id int primary key auto_increment,
    p_id int,
    t_difficulty int,
    t_ochoose_num int,
    t_mchoose_num int,
    t_judge_num int,
    t_fill_num int,
    t_squestion_num int,
    t_code_num int,
    t_ochoose_score int,
    t_mchoose_score int,
    t_judge_score int,
    t_fill_score int,
    t_squestion_score int,
    t_code_score int,
    foreign key(p_id) references profession(p_id)
)engine=innodb default charset=utf8;


create table question(
    q_id int primary key auto_increment,
    q_type int,
    q_content text,
    q_answer text,
    q_analysis text,
    q_right int,
    q_wrong int
)engine=innodb default charset=utf8;

create table tag(
    tag_id int primary key auto_increment,
    tag_name varchar(20) not null
)engine=innodb default charset=utf8;


create table que_tag(
    q_id int,
    tag_id int,
    foreign key(q_id) references question(q_id),
    foreign key(tag_id) references tag(tag_id),
    primary key(q_id,tag_id)
)engine=innodb default charset=utf8;


create table pro_tag(
    p_id int,
    tag_id int,
    pt_rate int,
    foreign key(p_id) references profession(p_id),
    foreign key(tag_id) references tag(tag_id),
    primary key(p_id,tag_id)
)engine=innodb default charset=utf8;



create table u_que(
    u_id int,
    q_id int,
    uq_answer text,
    uq_understand text,
    foreign key(u_id) references user(u_id),
    foreign key(q_id) references question(q_id),
    primary key(u_id,q_id)
)engine=innodb default charset=utf8;


create table examhistory(
    h_id int not null primary key auto_increment,
    h_date date,
    u_id int,
    h_grade int,
    foreign key(u_id) references user(u_id)
)engine=innodb default charset=utf8;


create table h_que(
    h_id int,
    q_id int,
    hq_answer text,
    foreign key(h_id) references examhistory(h_id),
    foreign key(q_id) references question(q_id),
    primary key(h_id,q_id)
)engine=innodb default charset=utf8;


create table quecomment(
    u_id int,
    q_id int,
    qc_date date,
    qc_content text,
    qc_zan int,
    foreign key(u_id) references user(u_id),
    foreign key(q_id) references question(q_id),
    primary key(u_id,q_id)
)engine=innodb default charset=utf8;


create table quecollection(
    u_id int,
    q_id int,
    foreign key(u_id) references user(u_id),
    foreign key(q_id) references question(q_id),
    primary key(u_id,q_id)
)engine=innodb default charset=utf8;
