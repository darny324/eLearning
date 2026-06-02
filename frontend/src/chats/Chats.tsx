import { useLoaderData, useNavigate } from "react-router"
import Icon from '../assets/react.svg'
import ProfileImg from '../assets/profile2.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera, faCross, faDownload, faEllipsisVertical, faFaceSmile, faFile, faImage, faLink, faLinkSlash, faPaperPlane, faSearch, faX, faXmark } from "@fortawesome/free-solid-svg-icons"
import { Badge, Button, FileInput, Label } from "flowbite-react"
import type chatLoader from "@/loaders/chatLoader"
import EmojiPicker from 'emoji-picker-react'
import { useEffect, useRef, useState, type ChangeEvent } from "react"


const ChatList = () => {

  const users = [
    {
      name: 'James Taylor',
      img_url: ProfileImg,
      last_message: 'What you doing?',
      message_date: new Date(),
    }, {
      name: 'Jonny Jones',
      img_url: ProfileImg,
      last_message: 'Hey what are your hobby?',
      message_date: new Date(),
    }, {
      name: 'Jonny Jones',
      img_url: ProfileImg,
      last_message: 'Hey what are your hobby? to create an education system that can generate a learning ',
      message_date: new Date(),
    }, {
      name: 'Jonny Jones',
      img_url: ProfileImg,
      last_message: 'Hey what are your hobby?',
      message_date: new Date(),
    }, {
      name: 'Jonny Jones',
      img_url: ProfileImg,
      last_message: 'Hey what are your hobby?',
      message_date: new Date(),
    }, {
      name: 'Jonny Jones',
      img_url: ProfileImg,
      last_message: 'Hey what are your hobby?',
      message_date: new Date(),
    }, {
      name: 'Jonny Jones',
      img_url: ProfileImg,
      last_message: 'Hey what are your hobby?',
      message_date: new Date(),
    }, {
      name: 'Jonny Jones',
      img_url: ProfileImg,
      last_message: 'Hey what are your hobby?',
      message_date: new Date(),
    },
  ]

  const navigate = useNavigate();

  return (
    <div className="h-full shadow-md rounded-lg flex-1 px-4 py-4 flex
      flex-col gap-4 dark:bg-gray-900">
      <header className="flex justify-between ">
        <h2 className="text-pink-400 font-semibold text-2xl">Skillgrid</h2>
        <img src={Icon} width={24} height={24} />
      </header>

      <div className="px-4 rounded-full bg-gray-50 dark:bg-gray-700 
        shadow-md flex items-center gap-2 has-[input:focus]:shadow-lg">
        <FontAwesomeIcon icon={faSearch} />
        <input className="w-full py-4 outline-none" />
      </div>

      <ul className="mt-8 md:hidden grid grid-cols-1 px-2 gap-4 overflow-y-scroll 
        scrollbar-none">
        {
          users.map((user, i) => {
            return (

              <li
                key={user.name + i}
                onClick={() => {
                  navigate(`/userId/chats/chatId`);
                }}
                className="flex justify-start items-center gap-4 rounded-lg
          hover:bg-gray-100 dark:hover:bg-gray-800 py-4
          px-4 cursor-pointer w-full min-w-0">
                <div>
                  <img className="w-16 h-16 shrink-0 object-fit rounded-full" src={user.img_url} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-xl">{user.name}</span>
                  <span className="text-xs text-gray-500 flex items-center gap-2 dark:text-gray-400">
                    <p className="truncate w-28">{user.last_message}</p>
                    <Badge className="text-center" color="blue">{user.message_date.toLocaleString('en-US', { month: 'short' })} {user.message_date.getDay()}</Badge>
                  </span>
                </div>
              </li>
            )
          })
        }
      </ul>


      <ul className="mt-8 hidden md:grid grid-cols-1 px-2 gap-4 overflow-y-scroll 
        scrollbar-none">
        {
          users.map((user, i) => {
            return (

              <li
                key={user.name + i}
                onClick={() => {
                  navigate(`/userId/chats?chatId=${'chat' + i}&userId=234`)
                }}
                className="flex justify-start items-center gap-4 rounded-lg
          hover:bg-gray-100 dark:hover:bg-gray-800 py-4
          px-4 cursor-pointer">
                <div>
                  <img className="w-16 h-16 object-fit rounded-full" src={user.img_url} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-xl">{user.name}</span>
                  <span className="text-xs text-gray-500 flex items-center gap-2 dark:text-gray-400">
                    <p className="max-w-52 truncate">{user.last_message}</p>
                    <Badge color="blue">{user.message_date.toLocaleString('en-US', { month: 'short' })} {user.message_date.getDay()}</Badge>
                  </span>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

const DirectChat = () => {
  const data = useLoaderData() as Awaited<ReturnType<typeof chatLoader>>;
  const { chatId, userId, sender, messages } = data;
  if (chatId == null) {
    return (<></>);
  }

  const [message, setMessage] = useState<string>('');
  const [files, setFiles] = useState<File[] | null>(null);
  const [isEmojiOpen, setIsEmojiOpen] = useState<boolean>(false);
  const [images, setImages] = useState<File[] | null>(null);
  const localUrls = useRef<string[]>([]);
  const handleMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const fs = e.target.files;
    let selectedFiles: File[] = [];
    if (fs) {
      for (let i = 0; i < fs?.length; i++) {
        if (fs[i] && !fs[i].type.startsWith('image/')) {
          selectedFiles.push(fs[i]);
        }
      }
      setFiles(selectedFiles);
    }
  }

  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    const fs = e.target.files;
    if (fs) {
      const selectedImages: File[] = [];
      for (let i = 0; i < fs?.length; i++) {
        if (fs[i]) {
          const url = URL.createObjectURL(fs[i]);
          localUrls.current.push(url);
          selectedImages.push(fs[i]);
        }
      }
      setImages(selectedImages);
    }
  }



  return (
    <div className="flex-1 h-full rounded-md shadow-md 
        dark:bg-gray-900 flex flex-col w-full relative">
      <div className="px-4 shadow-md rounded-md py-4 flex
          justify-between items-center w-full sticky top-0">
        <div className="flex items-center gap-4">
          <img src={sender.profile_img}
            className="w-14 h-14 rounded-full"
          />
          <div>
            <span className="text-gray-500 font-semibold text-lg
                ">{sender.name}</span>
            <Badge color="green" className="w-fit mt-2">{sender.type}</Badge>
          </div>
        </div>
        <div className="relative">
          <div className="px-2 py-2 rounded-md hover:bg-gray-500
            cursor-pointer">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </div>
          <div className="absolute right-0 text-red-500 rounded-md bg-gray-200">
            <button className="w-32 h-12 cursor-pointer hover:bg-gray-300 rounded-t-md">Block</button>
            <button className="w-32 h-12 cursor-pointer hover:bg-gray-300 rounded-b-md">Delete</button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-scroll scrollbar-none mb-4">
        <div className=" w-full px-2 pt-4 flex gap-4 flex-col">
          <p className="max-w-120 min-w-60 bg-gray-200 px-2 py-2 rounded-md self-start">
            Hi, What you doing allkjdfa al;skdfjasdff al;skdjflaksfd alksjdfas
            lkasjdfas a dsflaksdfalks a;ldjfasdlkfj
          </p>

          <p className="bg-blue-400 px-2 py-2 rounded-md max-w-120 
            min-w-60 self-end text-white">
            Hi, What about we go to the caffee kljasdfjkla;s as;ldlkjfasdf ;dsflaksdfalks
            a;lksjdf  lkjoiwer opiquwerl;,j a0p0oiwerwe lkjassdlkfo
          </p>

          <p className="self-end">
            <div className="w-80 h-80 rounded-md bg-gray-200">
              <img
                src={ProfileImg}
                className="object-contain w-80 h-80" />
            </div>
          </p>

          <p className="self-end bg-blue-400 px-2 py-2 rounded-md max-w-120 
            min-w-60 text-white flex items-center gap-2 animate-slide-in-up">
            <div className="flex justify-center items-center w-10 h-10 
              bg-white rounded-full">
              <FontAwesomeIcon className="text-black text-2xl" icon={faFile} />
            </div>
            <div>
              <p className="font-semibold">Window_323_8akljdsfasda_x86_64.zip</p>
              <p className="text-gray-200 text-sm">zip file</p>
            </div>

            <button
              className="text-xl"
            >
              <FontAwesomeIcon icon={faDownload} />
            </button>
          </p>
          <p className="max-w-120 min-w-60 bg-gray-200 px-2 py-2 rounded-md self-start">
            Hi, What you doing allkjdfa al;skdfjasdff al;skdjflaksfd alksjdfas
            lkasjdfas a dsflaksdfalks a;ldjfasdlkfj
          </p>

          <p className="bg-blue-400 px-2 py-2 rounded-md max-w-120 
            min-w-60 self-end text-white">
            Hi, What about we go to the caffee kljasdfjkla;s as;ldlkjfasdf ;dsflaksdfalks
            a;lksjdf  lkjoiwer opiquwerl;,j a0p0oiwerwe lkjassdlkfo
          </p>

          <p className="self-end">
            <div className="w-80 h-80 rounded-md bg-gray-200">
              <img
                src={ProfileImg}
                className="object-contain w-80 h-80" />
            </div>
          </p>

          <p className="self-end bg-blue-400 px-2 py-2 rounded-md max-w-120 
            min-w-60 text-white flex items-center gap-2 animate-slide-in-up">
            <div className="flex justify-center items-center w-10 h-10 
              bg-white rounded-full">
              <FontAwesomeIcon className="text-black text-2xl" icon={faFile} />
            </div>
            <div>
              <p className="font-semibold">Window_323_8akljdsfasda_x86_64.zip</p>
              <p className="text-gray-200 text-sm">zip file</p>
            </div>

            <button
              className="text-xl"
            >
              <FontAwesomeIcon icon={faDownload} />
            </button>
          </p>
          <p className="max-w-120 min-w-60 bg-gray-200 px-2 py-2 rounded-md self-start">
            Hi, What you doing allkjdfa al;skdfjasdff al;skdjflaksfd alksjdfas
            lkasjdfas a dsflaksdfalks a;ldjfasdlkfj
          </p>

          <p className="bg-blue-400 px-2 py-2 rounded-md max-w-120 
            min-w-60 self-end text-white">
            Hi, What about we go to the caffee kljasdfjkla;s as;ldlkjfasdf ;dsflaksdfalks
            a;lksjdf  lkjoiwer opiquwerl;,j a0p0oiwerwe lkjassdlkfo
          </p>

          <p className="self-end">
            <div className="w-80 h-80 rounded-md bg-gray-200">
              <img
                src={ProfileImg}
                className="object-contain w-80 h-80" />
            </div>
          </p>

          <p className="self-end bg-blue-400 px-2 py-2 rounded-md max-w-120 
            min-w-60 text-white flex items-center gap-2 animate-slide-in-up">
            <div className="flex justify-center items-center w-10 h-10 
              bg-white rounded-full">
              <FontAwesomeIcon className="text-black text-2xl" icon={faFile} />
            </div>
            <div>
              <p className="font-semibold">Window_323_8akljdsfasda_x86_64.zip</p>
              <p className="text-gray-200 text-sm">zip file</p>
            </div>

            <button
              className="text-xl"
            >
              <FontAwesomeIcon icon={faDownload} />
            </button>
          </p>

          <p className="flex max-w-120 min-w-60 items-end gap-2">
            <img
              src={ProfileImg}
              className="w-10 h-10 rounded-full" />
            <div className="bg-gray-200 dark:bg-gray-700 rounded-md px-4 py-2">
              HI, Hey what is your name,
              I want study partners, 2asdfklasdd, aslkdjfasdf oiuwerq
              lkajsdfajl woieruqwerlk oiasdfasdjl; oiidueqwroiwu
            </div>
          </p>
        </div>
      </div>

      {
        localUrls.current.length > 0 &&
        <div className="px-4">
          <ul className="px-2 bg-gray-200 dark:bg-gray-700 w-full py-4 
              flex gap-4 rounded-md mb-4 overflow-x-scroll scrollbar-none
              animate-slide-in-up">
            {
              localUrls.current.map((url, i) => {
                return (<li
                  key={url + i}
                  className=""
                >
                  <div className="
                      w-28 h-28 relative rounded-md bg-white">
                    <img
                      className="w-28 h-28 rounded-md object-contain"
                      src={url}
                    />
                    <button className="absolute -top-3 -right-2 p-1 w-6 h-6  
                        bg-gray-300 text-white rounded-full flex items-center justify-center
                        hover:bg-red-500 cursor-pointer"
                      onClick={() => {
                        let newImages: File[] | undefined = [];
                        newImages = images?.filter((img, img_index) => {
                          if (i !== img_index) return img;
                        })
                        setImages(newImages ? newImages : []);
                        const newUrls = localUrls.current.filter((url, url_index) => {
                          if (i !== url_index) return url;
                        })
                        localUrls.current = newUrls;
                      }}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                </li>)
              })
            }
          </ul>
        </div>
      }

      {
        files && files?.length > 0 && <div className="absolute max-w-96 bg-gray-200 
          top-56 left-62 rounded-md px-2 py-2 dark:bg-gray-700">
          <ul>
            {
              files?.map((file, i) => {
                return (<li
                  key={file.name + file.type + i}
                  className="px-2 py-1 flex items-center gap-2 "
                >
                  <div className="bg-white rounded-full px-2 py-2">
                    <FontAwesomeIcon className="text-2xl text-blue-500" icon={faFile} />
                  </div>
                  <div>
                    <p>{file.name}</p>
                    <p className="text-gray-500">{file.type.split('/')[1]} file</p>
                  </div>
                </li>)
              })
            }
          </ul>

          <div className="flex gap-2 my-2">
            <Button
              onClick={() => {
                setFiles([]);
              }}
              className="cursor-pointer bg-gray-500 hover:bg-gray-600" color={'gray-400'} >Cancel</Button>
            <Button className="cursor-pointer">Send</Button>
          </div>
        </div>
      }
      <div className="px-4">
        <div className="sticky bottom-0 w-full mb-4 py-1 px-4
            flex rounded-full shadow-md items-center gap-4 text-lg
            dark:bg-slate-800">
          <div className="relative">
            <FontAwesomeIcon icon={faFaceSmile}
              onClick={() => { setIsEmojiOpen(!isEmojiOpen) }}
              className="text-gray-300 dark:text-gray-700
                hover:text-gray-400 dark:hover:text-gray-500 
                cursor-pointer"
            />
            <div className="absolute bottom-12">
              {
                isEmojiOpen &&
                <EmojiPicker
                  onEmojiClick={(e) => {
                    setMessage((m) => m + e.emoji);
                  }}
                />
              }
            </div>
          </div>
          <input
            value={message}
            onChange={handleMessage}
            className="w-full text-base py-2 outline-none" />
          <div>
            <Label
              htmlFor="file-input" >
              <FontAwesomeIcon icon={faLink}
                className="text-gray-300 text-base dark:text-gray-700
                  hover:text-gray-400 dark:hover:text-gray-600 cursor-pointer
                  "
              />
            </Label>
            <FileInput
              onChange={handleFiles}
              multiple
              accept="*"
              id="file-input" className="hidden">
            </FileInput>
          </div>
          <div>
            <Label
              htmlFor="image-input"
            >
              <FontAwesomeIcon icon={faImage}
                className="text-gray-300 text-base dark:text-gray-700 
                hover:text-gray-400 dark:hover:text-gray-600 cursor-pointer"
              />
            </Label>
            <FileInput
              onChange={handleImages}
              multiple
              accept="image/*"
              id="image-input"
              className="hidden"
            ></FileInput>
          </div>
          <FontAwesomeIcon className="text-blue-500 hover:text-blue-600 
              cursor-pointer"
            icon={faPaperPlane} />
        </div>
      </div>
    </div>

  )
}

const Chats = () => {


  return (
    <div className="h-screen md:ml-64 py-8 px-8 gap-8 flex w-full">
      <ChatList />
      <div className="flex-2 hidden md:flex gap-8">
        <DirectChat />

      </div>
    </div>
  )
}

export default Chats
