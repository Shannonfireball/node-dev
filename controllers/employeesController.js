const Employee = require("../model/Employee");


const getAllEmployees = async (request,response)=>{ 
    const employee = await Employee.find(); 
    if(!employee){
        response.status(204).json({ "message":"no employees" });
    };
    response.json(employee);
};


const createNewEmployee = async (request,response)=>{
    if(request?.body?.firstname || !request?.body?.lastname){
        return response.status(400).json({ "message":"first and last names are required"})
    }

    try{
        const result = await Employee.create({
            firstname:request.body.lastname,
            lastname:request.body.lastname
        });
        response.json(result);
    } catch(error){
        console.error(error);
    }


};

const updateEmployee = async (request,response)=>{
    if(!request?.body?.id){
        return response.status(400).json({ "message":"id required " });
    }

    const employee = await Employee.findOne({ _id:request.body.id }).exec();
    if(!employee){
        return response.status(201).json({ "message":`no employee matchs ${request.body.id}` });
    }

    if(request.body?.firstname){
        employee.firstname = request.body.firstname;
    }
    if(request.body?.lastname){
        employee.lastname = request.body.firstname;
    }
    const result = await employee.save();
    response.json(result);
};

const deleteEmployee = async (request,response)=>{
    if(!request?.body?.id){
        return response.status(400).json({ "message":"id required " });
    }
    const employee = Employee.findOne({ _id:request.body.id }).exec();
    if(!employee){
        return response.status(201).json({ "message":`no employee matchs ${request.body.id}` });
    }
    const result = await employee.deleteOne({ _id:request.body.id });
    response.json(result);
};

const getEmployee = async (request,response)=>{
    if(!request?.params?.id){
        return response.status(400).json({ "message":"id required " });
    }
    const employee = Employee.findOne({ _id:request.params.id }).exec();
    if(!employee){
        return response.status(204).json({"message":`employee ${request.body.id} does not exist`})
    }
    response.json(employee);
};




module.exports = { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee }