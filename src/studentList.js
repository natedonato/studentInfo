import React from 'react';
import StudentItem from './studentItem';

class StudentList extends React.Component {
    constructor(props){
        super(props);
        this.state = {students: "loading",
            name: "",
            tag: "",
            tags: {},
            filtered: [],
            doubleFiltered: []
        };
    }

    componentDidMount(){
        let context = this;
        fetch('https://www.natedonato.com/circus/unfinished/data')
            .then(function (response) {
                let json = response.json();
                return json;
            })
            .then(function (myJson) {
                context.setState({students: myJson.students});
                context.setState({filtered: myJson.students});
                context.setState({doubleFiltered: myJson.students});
        });
    }

    filterName(e){
        let name;
        if (e) {
            name = e.target.value;
            this.setState({ name: name });
            console.log(name);
        }else{
            name = this.state.name;
            console.log(name);
        }

        if(name.length === 0){
            let allStudents = this.state.students;
            this.setState({filtered: allStudents});
            return;
        }

        let filtered = [];
        this.state.students.forEach(student => {
            if(student.firstName.slice(0, name.length).toLowerCase() === name.toLowerCase() || student.lastName.slice(0, name.length).toLowerCase() === name.toLowerCase()){
                filtered.push(student);
            }
        });
        
        this.setState({ filtered: filtered });
    }

    filterTags(e){
        let tag = e.target.value;
        this.setState({tag: tag});
    }

    addTag(id, tag){

        if(!this.state.tags[id]){
            let tags = this.state.tags;
            tags[id] = [tag];
            this.setState({ tags: tags });
        }else{
            let tags = this.state.tags;
            tags[id].push(tag);
            this.setState({ tags: tags});
        }
    }
    
    render(){
        if(this.state.students === "loading"){
            return (<div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>)
        }else{


            return(
                <div className="studentContainer">
                    <div className="searchName">
                        <input type="text" placeholder="Search by name" onChange={this.filterName.bind(this)}/>
                        <input type="text" placeholder="Search by tags" onChange={this.filterTags.bind(this)}/>
                    </div>
                    {this.state.filtered.map(student => 
                        <StudentItem student={student} key={student.id} addTag={this.addTag.bind(this)} tags={this.state.tags[student.id]} tag={this.state.tag}/>
                    )}
                </div>
            )
        }
    }
}

export default StudentList;