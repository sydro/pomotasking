import React, { Component } from 'react'

export default class ArchivedList extends Component {
  destroy = (id) => {
    this.props.actions.destroy(id)
  }

  dearchive = (id) => {
    this.props.actions.dearchive(id)
  }
  renderControlButtons = (id) => {
    return (
      <div className='archive-controls'>
        <button
          className='task-control-button archive'
          onClick={() => { this.dearchive(id) }}
          type='button'>
          Archive
        </button>

        <button
          className='task-control-button destroy'
          onClick={() => { this.destroy(id) }}
          type='button'>
          Destroy
        </button>
      </div>
    )
  }

  renderArchived = () => {
    return (
      this.props.lists.map(l =>
        <div key={l.id}className='archived-row'>
          <div className='archived-list'>{l.name}</div>
          {this.renderControlButtons(l.id)}
        </div>
      )
    )
  }

  render () {
    return (
      <div>
        <div className='main-archived'>
          <div>Archived Lists</div>
        </div>

        <div className='archived-list-container'>
          <div>{JSON.stringify(this.lists)}</div>
          {this.renderArchived()}
        </div>
      </div>
    )
  }
}
