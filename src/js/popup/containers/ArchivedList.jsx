import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ArchivedList from '../components/ArchivedList'
import * as actions from '../actions/list'

function mapStateToProps (state) {
  return {
    lists: state.lists.sort((a, b) => new Date(b.archived_at).getTime() - new Date(a.archived_at).getTime()).filter(l => l.archived === true)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchivedList)

