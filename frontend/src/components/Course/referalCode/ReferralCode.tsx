function ReferralCode({refCode}:{refCode:string}) {
  return (
    <div className='lg:w-2  justify-content-start border-round accent' style={{border: '0.0625rem solid #dadce0'}}>
          <div className='pl-3 pt-3 accent text-sm'>Class Code</div>
           <div className="p-3 text-xl  primary">{refCode}</div>
    </div>
  )
}

export default ReferralCode