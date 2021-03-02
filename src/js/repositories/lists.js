export function getLists () {
  let lists = JSON.parse(window.localStorage.getItem(`lists`)) || []
  return lists
}

export function getArchivedLists () {
  let lists = JSON.parse(window.localStorage.getItem(`lists`)) || []
  let archivedLists = lists.sort((a, b) => new Date(b.archived_at).getTime() - new Date(a.archived_at).getTime()).filter(l => l.archived === true)
  return archivedLists
}
export function deleteList (listID) {
  let lists = getLists()

  lists = lists.filter(list => {
    return listID !== list.id
  })

  window.localStorage.setItem(
    'lists',
    JSON.stringify(lists)
  )

  window.localStorage.removeItem(`task-list-${listID}`)
}

export function persistCurrentListID (listID) {
  window.localStorage.setItem('current-list-id', listID)
}

export function getCurrentListID () {
  return window.localStorage.getItem('current-list-id')
}

export function persistList (listData) {
  let lists = getLists()
  let updated

  lists = lists.map(list => {
    if (list.id === listData.id) {
      updated = true
      return { ...list, ...listData }
    } else {
      return list
    }
  })

  if (!updated) {
    lists = lists.concat(listData)
  }

  window.localStorage.setItem(
    'lists',
    JSON.stringify(lists)
  )
}
