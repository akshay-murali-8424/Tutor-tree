import { Dropdown } from 'primereact/dropdown';
import React, { useState } from 'react'

function ToDo() {
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
  ];
  return (
    <div className="lg:w-5 mx-auto my-5 ">
     <div>
     <div className="card flex">
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                placeholder="All Classes" className="w-full md:w-16rem" />
     </div>
     </div>
    </div>
  )
}

export default ToDo