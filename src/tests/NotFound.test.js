import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

import NotFound from '../components/NotFound';

describe('Testa o componente <NotFound.js />', () => {
  const image = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const text = 'Page requested not found Crying emoji';
  it('se página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', { level: 2, name: text });
    expect(heading).toBeInTheDocument();
  });
  it(`se página mostra a imagem ${image}`, () => {
    renderWithRouter(<NotFound />);
    const imgs = screen.getAllByRole('img');
    const img = imgs.find((element) => element.src === image);
    expect(img).not.toBeUndefined();
  });
});
