import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
class ListContacts extends Component {
  static propTypes={
    contacts:PropTypes.array.isRequired,
    onclickDelete: PropTypes.func.isRequired,
  }
  state={
    query:''
  }
  updateQuery=(query)=>{
    this.setState(()=>(
      {
        query:query.trim()
      }
    ))
  }
  render() {
    const {query}=this.state
    const{contacts,onclickDelete}=this.props
    const showingContacts=query===''? contacts : contacts.filter((c)=>(c.name.toLowerCase().includes(query.toLowerCase())))
    return (
  
    
    <div className="list-contacts">
        <div className="list-contacts-top">
        <nav className=" navbar navbar-light bg-light">
      <span className="navbar-brand mb-0 h1">Contacts</span>
    </nav>
          <input className="search-contacts" 
          type="text" placeholder="search contact"
           value={this.state.query} 
           onChange={(event)=>this.updateQuery(event.target.value)}></input>
        <Link to="/create" className='add-contact'>add-contact</Link>
        </div>
      {
        showingContacts.length !==contacts.length &&(
          <div className="showing-contacts">
            <span>Now showing {showingContacts.length} of {contacts.length}</span>
            <button onClick={()=>this.updateQuery('')}>show all</button>
          </div>
        )
      }

      <ol className='contact-list' >
          {showingContacts.map((contact)=>
          (
          <li key={contact["id"]} className='contact-list-item'> 
           <div className="contact-avatar" 
            style={{
              backgroundImage: `url(${contact.avatarURL})`
          }}>             
             </div>
             <div className='contact-details'>
        <p>{contact['name']}</p>
        <p>{contact['handle']}</p>
               </div> 
               <button onClick={()=>onclickDelete(contact)} className='contact-remove'>
            Remove
          </button>
          </li>
          ))}  
         </ol>
      </div>
    
    )
  }
}

export default ListContacts