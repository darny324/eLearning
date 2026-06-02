import type { LoaderFunctionArgs } from "react-router";
import ProfileImg from '../assets/profile.png'

const chatLoader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const chatId = url.searchParams.get('chatId');
  const userId = url.searchParams.get('userId');
  const data = {
    chatId,
    userId,
    sender: {
      name: 'James Taylor',
      type: 'student',
      profile_img: ProfileImg,
    },
    messages: [
      {
        sender: 1234,
        message: 'Hi how are you?',
      }, {
        sender: 2345,
        message: 'Well, feeling quite good',
      }, {
        sender: 1234,
        message: 'Hey so do you want to study',
      }
    ]
  }
  return data;
}

export default chatLoader; 
