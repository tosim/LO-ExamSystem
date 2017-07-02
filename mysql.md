//1.用户表
user(u_id,u_name,u_email,u_pass,p_id)

//2.职业表
profession(p_id,p_name,p_ochoose_rate,p_mchoose_rate,p_judge_rate,p_fill_rate,p_squestion_rate,p_code_rate)

//3.题目(自定义标准)
question(q_id,q_type,q_content,q_answer,q_analysis,q_score,q_difficulty,q_right,q_wrong)

//4.试题标签
tag(t_id,t_name)

//5.试题-标签对应表
que_tag(qt_id,q_id,t_id)

//6.职业-标签比率表
pro_tag(pt_id,p_id,t_id,pt_rate)

//7.用户-题目表
u_que(uq_id,u_id,q_id,uq_answer,uq_understand)

//8.考试历史记录
examhistory(h_id,h_date,u_id,h_grade)

//9.考试-题目表
h_que(hq_id,h_id,q_id,hq_answer)

//10.题目评论
quecomment(qc_id,q_id,qc_date,qc_content,u_id,qc_zan)

//11.题目收藏夹
quecollection(u_id,q_id)


