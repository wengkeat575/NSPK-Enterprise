const mysql = require("mysql");


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "employees"

});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});


function makeRandomKey(){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


var create_email_table = "CREATE TABLE IF NOT EXISTS email (emp_no INT , email  VARCHAR(80), secKey  CHAR(8) , role VARCHAR(20) , PRIMARY KEY(emp_no)) ";
var check_if_email_empty = "select count(emp_no) AS num from email;";
var num_of_employee = "select count(emp_no) AS num from employees;";

// var get_emp_num= `SELECT emp_no FROM employees LIMIT ${i}, 1`;
// var insert_emp_no_and_secKey = `INSERT INTO email (emp_no, secKey) VALUES (${emp_id}, '${secKey}')`;



connection.query(create_email_table, (err, result) => {
    if (err) throw err;
connection.query(check_if_email_empty, (err, result) => {
    if (err) throw err;
    console.log("check email empty: ",result[0].num);

    if (result[0].num === 0 ){

        var secKey = 0;
        var num_of_emp = 0;

        connection.query(num_of_employee, (err, result) => {
            if (err) throw err;

            var i;
            for (i = 0; i < result[0].num; i++) {
                secKey = makeRandomKey();
                emp_no = 0
                connection.query(`SELECT emp_no FROM employees LIMIT ${i}, 1`, (err, result) => {
                    if (err) throw err;
                    emp_no = result[0].emp_no
                    console.log(emp_no)
                    connection.query(`INSERT INTO email (emp_no, secKey) VALUES (${emp_no}, '${secKey}')`, (err, result) => {
                        if (err) throw err;


                    });

                });
            } 
            console.log(result[0].num)

        });

        console.log("sdjs",num_of_emp)
        

    }
});
});

