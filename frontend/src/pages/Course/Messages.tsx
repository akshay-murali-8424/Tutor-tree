import { MinChatUI } from '@minchat/reactui';

function Messages() {
    const currentUser = {
        id: "1" ,
        name: "Group" ,
        avatar: "urltoavatar.com/michaelavatar.jpg"
}
  return (
    <>
    <MinChatUI
    groupChatTitle='dacd'
    user={currentUser}
    startConversation={currentUser}
    apiKey={743141997}
    themeColor='#258994'
>
    <input type="text" />
   </MinChatUI>
</>
  )
}

export default Messages