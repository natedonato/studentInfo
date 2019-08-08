import React from 'react';
import Tags from './tags';

class StudentItem extends React.Component {
    constructor(props) {
        super(props);
        let total = 0;
        for (var i = 0; i < this.props.student.grades.length; i++) {
            total += parseInt(this.props.student.grades[i]);
        }

        let avg = total / this.props.student.grades.length;
        this.state = {average: avg, expanded: false};
    }

    toggleExpand(){
        let current = this.state.expanded;
        this.setState({expanded: !current});
    }

    render() {
        let includesTag = true;

        if(this.props.tag){
            if(!this.props.tags){
                return(null);
            }
            const tag = this.props.tag;
            includesTag = false;
            this.props.tags.forEach(el => {
                if(el.slice(0,tag.length).toLowerCase() === tag.toLowerCase()){
                    includesTag = true;
                }
            });
            if(!includesTag){
                return(null);
            }
        }


        return (
            <div className="studentItem">
                <img src={this.props.student.pic} alt={this.props.student.firstName}/>
                <h2> {this.props.student.firstName} {this.props.student.lastName} 
                    <span onClick={this.toggleExpand.bind(this)}>
                        {this.state.expanded ? <i className="fas fa-minus"></i> : <i className="fas fa-plus"></i> }
                    </span>
                </h2>

                <div className="studentInfo">
                    <p>Email: {this.props.student.email}</p>
                    <p>Company: {this.props.student.company}</p>
                    <p>Skill: {this.props.student.skill}</p>
                    <p>Average: {this.state.average}%</p>
                    {this.state.expanded ? 
                        <>
                            <br></br>
                            {this.props.student.grades.map((grade, idx) =>
                                <p key={idx}> Test {idx + 1}: <span style={{marginLeft: "35px"}}>{grade}%</span></p>
                            )}
                            <Tags tags={this.props.tags || []} addTag={this.props.addTag} key={this.props.student.id} id={this.props.student.id} />

                        </>
                        : null
                    }
                </div>

            </div>
        )
    }
}

export default StudentItem;