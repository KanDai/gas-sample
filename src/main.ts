const getUser = () => {
  const sheet = SpreadsheetApp.getActiveSheet()
  const lastRow = sheet.getLastRow()
  const range = sheet.getRange(2, 1, lastRow - 1, 2)
  const values = range.getValues()
  const randomIndex = Math.floor(Math.random() * values.length)
  return values[randomIndex]
}

const getProperty = (property: string) => {
  return PropertiesService.getScriptProperties().getProperty(property)
}

const postResult = (username: string, user_id: string) => {
  const url = getProperty('SLACK_WEBHOOK_URL')
  const data = {
    channel: getProperty('SLACK_POST_CHANNEL'),
    username: getProperty('SLACK_POST_USER'),
    attachments: [
      {
        text: `結果は${username}です。<@${user_id}>`,
      },
    ],
  }
  const payload = JSON.stringify(data)
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    contentType: 'application/json',
    payload: payload,
  }
  if (!url) return
  UrlFetchApp.fetch(url, options)
}

const main = () => {
  const user = getUser()
  postResult(user[0], user[1])
}
