import React, { Component } from 'react'
import NewTaskForm from './NewTaskForm'
import Task from './Task'
import { convertMS } from '../../utils/presentDuration'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'

let Element = SortableElement(({task, actions}) =>
  <Task
    actions={actions}
    task={task} />
)

let List = SortableContainer(({items, actions, children}) =>
  <div className='tasks-container'>
    {items.map((task, index) =>
      <Element
        task={task}
        actions={actions}
        key={`task-item-${task.id}`}
        index={index} />
    )}
    {children}
  </div>
)

export default class Tasks extends Component {
  constructor () {
    super(...arguments)

    this.state = { showingFinished: false }
  }

  render () {
    if (this.props.currentListID) {
      return this.renderBody()
    } else {
      return (
        <p className='tasks-blank-slate tasks-without-list'>
          Choose the list in the sidebar.
        </p>
      )
    }
  }

  downloadCsvReport = () => {
    let content = this.props.finishedTasks.map(t => {
      let start = new Date(t.addedAt)
      let stop = new Date(t.finishedAt)
      return '"' + t.description + '","' + convertMS(t.totalTime) + '","' + t.totalTime + '","' + start.toLocaleDateString() + ' ' + start.toLocaleTimeString() + '","' + stop.toLocaleDateString() + ' ' + stop.toLocaleTimeString() + '"'
    })
    const element = document.createElement('a')
    const file = new Blob(['"description","HumanTotalTime","totalTime","Added","Finished"\r\n', content.join('\r\n')], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = 'report.csv'
    document.body.appendChild(element)
    element.click()
  }

  renderBody () {
    return (
      <div>
        <NewTaskForm
          onSubmit={(description) => this.props.actions.newTask(description)} />

        {this.renderList()}
      </div>
    )
  }

  renderShowFinishedButton () {
    if (!this.props.finishedTasks.length) { return }

    return (
      <button
        className='tasks-list-finished-separator'
        key='show-finished-task-button'
        type='button'
        onClick={() => this.setState({ showingFinished: !this.state.showingFinished })}>
        {this.state.showingFinished ? 'Hide' : 'Show'} Completed ({this.props.finishedTasks.length})
      </button>
    )
  }

  renderFinishedList () {
    if (!this.state.showingFinished) { return }

    let items = this.props.finishedTasks.map(task =>
      <Task
        key={`finished-task-${task.id}`}
        task={task}
        actions={this.props.actions} />
    )

    return (
      <div key='finishedTasks'>
        <div className='tasks-list-finished-separator'>
          <button onClick={this.downloadCsvReport}>CSV Report</button>
        </div>
        {items}
      </div>
    )
  }

  renderList () {
    if (this.props.tasks.length) {
      return (
        <List
          items={this.props.notFinishedTasks}
          onSortEnd={({oldIndex, newIndex}) => {
            let newArrange = arrayMove(this.props.notFinishedTasks, oldIndex, newIndex)

            let newOrder = newArrange.map(task => task.id)

            this.props.actions.updateOpenedTasksOrder(newOrder)
          }}
          shouldCancelStart={(evt) => evt.target.tagName !== 'P'}
          children={[
            this.renderShowFinishedButton(),
            this.renderFinishedList()
          ]}
          actions={this.props.actions} />
      )
    } else {
      return (
        <p className='tasks-blank-slate tasks-list-empty'>
          Your list is empty! Create a task task above.
        </p>
      )
    }
  }
}
