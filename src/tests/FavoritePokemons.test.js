import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

// import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('', () => {
  it('', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
  it('', () => {
    renderWithRouter(<App />);
    //
    const moreDetailsApp = screen.getByRole('link', { name: 'More details' });
    expect(moreDetailsApp).toBeInTheDocument();
    userEvent.click(moreDetailsApp);
    //
    const checkButton = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkButton).toBeInTheDocument();
    userEvent.click(checkButton);
    //
    const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorites).toBeInTheDocument();
    userEvent.click(favorites);
    //
    const moreDetailsFavorites = screen.getByRole('link', { name: 'More details' });
    expect(moreDetailsFavorites).toBeInTheDocument();
    userEvent.click(moreDetailsFavorites);
  });
});
