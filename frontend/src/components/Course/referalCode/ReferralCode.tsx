import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from 'react-hot-toast';

function ReferralCode({refCode}:{refCode:string}) {
  return (
    <div className='lg:w-2  justify-content-start border-round accent' style={{border: '0.0625rem solid #dadce0'}}>
          <div className='pl-3 pt-3 accent text-sm flex'>Class Code
          </div>
           <div className="p-3 text-xl  primary flex">{refCode} 
           <CopyToClipboard
     text={refCode}
     onCopy={() =>  toast.success('Copied to clipboard')}>
        <span className="ml-4 cursor-pointer"><i className="pi pi-copy"></i></span>
       </CopyToClipboard>
          </div>
    </div>
  )
}

export default ReferralCode