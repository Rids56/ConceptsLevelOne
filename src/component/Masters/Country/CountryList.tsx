import React, { useCallback, useEffect } from 'react'
import { getToken } from '../../../assets/CommonApi/countryToken';
import { getCountries } from '../../../assets/CommonApi/commonapi';

const CountryList: React.FC = () => {
  // const fetchCountryList = (async () => {
  //   const data = await getCountries();
  //   console.log('list', data);
  // });

  const fetchToken = (async () => {
    const token = await getToken();
    if (token) {
      sessionStorage.setItem('apitoken', (token?.auth_token));
    }
  })

  useEffect(() => {
    const getApiToken = sessionStorage.getItem('apitoken');
    if (!getApiToken) {
      fetchToken();
    }
    // fetchCountryList();
  }, [])

  return (
    <div>CountryList</div>
  )
}

export default CountryList;