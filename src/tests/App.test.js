import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('1-Testa se o topo da aplicação contém um conjunto fixo de links de navegação',
  () => {
    it('O primeiro link deve possuir o texto Home', () => {
      renderWithRouter(<App />);
      const link = screen.getByRole('link', { name: 'Home' });
      expect(link).toBeInTheDocument();
    });
    it('O segundo link deve possuir o texto About', () => {
      renderWithRouter(<App />);
      const link = screen.getByRole('link', { name: 'About' });
      expect(link).toBeInTheDocument();
    });
    it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
      renderWithRouter(<App />);
      const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
      expect(link).toBeInTheDocument();
    });
    it('redireciona para / ao clicar no link Home da barra de navegação', () => {
      const { history } = renderWithRouter(<App />);
      const link = screen.getByRole('link', { name: 'Home' });
      userEvent.click(link);
      expect(history.location.pathname).toBe('/');
    });
    it('redirecionada para /about, ao clicar no link About da barra de navegação', () => {
      const { history } = renderWithRouter(<App />);
      const link = screen.getByRole('link', { name: 'About' });
      userEvent.click(link);
      expect(history.location.pathname).toBe('/about');
    });
    it('redireciona para /favorites, ao clicar no link Favorite Pokémons', () => {
      const { history } = renderWithRouter(<App />);
      const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
      userEvent.click(link);
      expect(history.location.pathname).toBe('/favorites');
    });
  });
