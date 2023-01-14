import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';
import Pokemon from '../components/Pokemon';

import pokemons from '../data';

const PokemonWeightId = 'pokemon-weight';

const MoreDetails = 'More details';
const quatro = 4;

const describe1 = '6.1-Testa se é renderizado um card com informações '
+ 'de determinado pokémon';

describe(describe1, () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    pokemons.forEach((pokemon) => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
      const nameElement = screen.getByText(pokemon.name);
      expect(nameElement).toBeInTheDocument();
      cleanup();
    });
  });
  it('O tipo correto do Pokémon deve ser mostrado na tela', () => {
    pokemons.forEach((pokemon) => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
      const typeElement = screen.getByText(pokemon.type);
      expect(typeElement).toBeInTheDocument();
      cleanup();
    });
  });
  it('O peso médio do pokémon deve ser exibido com texto no formato especificado', () => {
    pokemons.forEach((pokemon) => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
      const weightElement = screen.getByTestId(PokemonWeightId);
      const AverageWeight = weightElement.innerHTML.split(':')[0];
      const weightText = weightElement.innerHTML.split(' ');
      expect(AverageWeight).toBe('Average weight');
      expect(weightText).toHaveLength(quatro);
      cleanup();
    });
  });
  it('A imagem do Pokémon deve ser exibida com os atributos alt e src corretos', () => {
    pokemons.forEach((pokemon) => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
      const imgs = screen.getAllByRole('img');
      expect(imgs[0]).toHaveAttribute('alt', `${pokemon.name} sprite`);
      expect(imgs[0]).toHaveAttribute('src', pokemon.image);
      cleanup();
    });
  });
  it('O card do Pokémon indicado na Pokédex contém um link de navegação para exibir '
+ 'detalhes deste Pokémon. O link deve possuir a URL correta', () => {
    pokemons.forEach((pokemon) => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
      const detailsElement = screen.getByText(MoreDetails);
      expect(detailsElement).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
      cleanup();
    });
  });
  it('Ao clicar no link de navegação do Pokémon, é feito o redirecionamento '
+ 'da aplicação para a página de detalhes de Pokémon', () => {
    const pokemon = pokemons[0];
    renderWithRouter(<App />);
    const detailsLink = screen.getByText(MoreDetails);
    userEvent.click(detailsLink);
    const detailsHeading = screen.getByRole(
      'heading', { level: 2, name: `${pokemon.name} Details` },
    );
    expect(detailsHeading).toBeInTheDocument();
    cleanup();
  });
  it('A URL exibida no navegador muda para /pokemon/<id>', () => {
    pokemons.forEach((pokemon) => {
      const { history } = renderWithRouter(
        <Pokemon pokemon={ pokemon } isFavorite={ false } />,
      );
      const detailsLink = screen.getByText(MoreDetails);
      userEvent.click(detailsLink);
      const { location: { pathname } } = history;
      expect(pathname).toBe(`/pokemons/${pokemon.id}`);
      cleanup();
    });
  });
});

describe('6.2-Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
  it('O ícone deve ser uma imagem com o atributo src'
+ 'contendo o caminho /star-icon.svg', () => {
    pokemons.forEach((pokemon) => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
      const img = screen.getByAltText(`${pokemon.name} is marked as favorite`);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', '/star-icon.svg');
      cleanup();
    });
  });
  it('A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde '
+ '<pokemon> é o nome do Pokémon exibido', () => {
    pokemons.forEach((pokemon) => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
      const img = screen.getByAltText(`${pokemon.name} is marked as favorite`);
      expect(img).toBeInTheDocument();
      cleanup();
    });
  });
});
