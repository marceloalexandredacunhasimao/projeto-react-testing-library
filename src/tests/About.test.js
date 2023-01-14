import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import About from '../components/About';

describe('2-Teste a componente <About.js />', () => {
  const image = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const txt1 = [
    'This application simulates a Pokédex, ',
    'a digital encyclopedia containing all Pokémons',
  ].join('');
  const txt2 = [
    'One can filter Pokémons by type, ',
    'and see more details for each one of them',
  ].join('');
  it('a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });
  it('a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(txt1);
    const p2 = screen.getByText(txt2);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });
  it(`a página contém a seguinte imagem de uma Pokédex: ${image}`, () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', image);
  });
});
/*
This application simulates a Pokédex, a
        digital encyclopedia containing all Pokémons
*/
