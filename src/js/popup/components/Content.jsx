import React, { Component } from 'react'
import Counter from '../containers/Counter'
import Tasks from '../containers/Tasks'
import ArchivedList from '../containers/ArchivedList'
import TodaysPomodoros from './TodaysPomodoros'
import { TODAYS_POMODORO_LIST, ARCHIVED_LIST } from '../../constants/misc'

export default class Content extends Component {
  render () {
    if (this.props.currentListID === TODAYS_POMODORO_LIST) {
      return <TodaysPomodoros />
    } else if (this.props.currentListID === ARCHIVED_LIST) {
      return <ArchivedList />
    } else {
      return (
        <div>
          <Counter />
          <Tasks />
        </div>
      )
    }
  }
}
