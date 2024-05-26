const close=document.querySelector('.close');
const Profile=document.querySelector('.profile');

close.onclick=()=>{document.querySelector('.settings').style.display='none';}
Profile.onclick=()=>{document.querySelector('.settings').style.display='flex';}
