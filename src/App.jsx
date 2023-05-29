import React, { useState, useEffect } from 'react';
import { fakerEN, fakerRU, fakerFR } from '@faker-js/faker';
import Form from './components/Form';
import Table from './components/Table';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'bootstrap/dist/css/bootstrap.min.css';
const seedrandom = require('seedrandom');

const App = () => {
  const [locale, setLocale] = useState(fakerRU);
  const [region, setRegion] = useState('RU');
  const [errorCount, setErrorCount] = useState(0);
  const [seed, setSeed] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
    setData(generateData(20, seed, errorCount, region, 1));
  }, [seed, errorCount, region, locale]);

  const generateData = (count, seed, errorCount, region, page) => {
    const selectedLocale = region === 'EN' ? fakerEN : region === 'RU' ? fakerRU : fakerFR;
    selectedLocale.seed(Number(seed + (page - 1) * count));
    const generatedData = [];

    for (let i = 0; i < count; i++) {
      const id = i + 1 + (page - 1) * count;
      const identifier = selectedLocale.string.numeric(10);
      const name = selectedLocale.person.fullName();
      const address = `${selectedLocale.location.state()}, ${selectedLocale.location.streetAddress()}, ${selectedLocale.location.secondaryAddress()}`;
      const phone = `${selectedLocale.phone.number()}`;

      const errorIndexSelector = seedrandom(`${seed + (page - 1) * count + i}`);
      const fields = [identifier, name, address, phone];

      for (let j = 0; j < errorCount; j++) {
        const randomIndex = Math.floor(errorIndexSelector() * fields.length);
        const field = fields[randomIndex];
        const fieldType = Math.floor(errorIndexSelector() * 3);

        if (fieldType === 0 && field.length > 0) {
          const index = Math.floor(errorIndexSelector() * field.length);
          fields[randomIndex] = field.slice(0, index) + field.slice(index + 1);
        } else if (fieldType === 1) {
          const alphabet = region === 'EN' ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '0123456789';
          const randomChar = alphabet[Math.floor(errorIndexSelector() * alphabet.length)];
          const index = Math.floor(errorIndexSelector() * field.length);
          fields[randomIndex] = field.slice(0, index) + randomChar + field.slice(index);
        } else if (fieldType === 2 && field.length > 1) {
          const index = Math.floor(errorIndexSelector() * field.length - 1);
          const char1 = field[index];
          const char2 = field[index + 1];
          fields[randomIndex] = field.slice(0, index) + char2 + char1 + field.slice(index + 2);
        }
      }

      generatedData.push({
        id,
        identifier: fields[0],
        name: fields[1],
        address: fields[2],
        phone: fields[3],
      });
    }

    return generatedData;
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    console.log(selectedLanguage);
    if (selectedLanguage === 'EN') {
      setLocale(fakerEN);
    } else if (selectedLanguage === 'RU') {
      setLocale(fakerRU);
    } else if (selectedLanguage === 'FR') {
      setLocale(fakerFR);
    }
    setRegion(selectedLanguage);
  };

  const handleErrorCountChange = (value) => {
    setErrorCount(value);
  };

  const handleSeedChange = (event) => {
    setSeed(event);
  };

  const handleRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 10000).toString();
    setSeed(randomSeed);
  };

  const loadMoreData = () => {
    const nextPage = page + 1;
    const newData = generateData(20, seed, errorCount, region, nextPage);

    setData((prevData) => [...prevData, ...newData]);
    setPage(nextPage);
  };

  const hasMore = true;

  return (
    <div className="container mt-4">
      <h1>Fake Data Generator</h1>
      <Form
        region={region}
        errorCount={errorCount}
        seed={seed}
        onRegionChange={setRegion}
        onErrorCountChange={handleErrorCountChange}
        onSeedChange={handleSeedChange}
        onRandomSeed={handleRandomSeed}
        onLanguageChange={handleLanguageChange}
      />
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        scrollThreshold={0.9}
      >
        <Table data={data} />
      </InfiniteScroll>
    </div>
  );
};

export default App;
