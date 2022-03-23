/*
Não deve existir o link de navegação para os detalhes do Pokémon selecionado.

A seção de detalhes deve conter um heading h2 com o texto Summary.

A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.

Teste se existe na página uma seção com os mapas contendo as localizações do pokémon

    Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.

    Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;

****    Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;

    A imagem da localização deve ter um atributo src com a URL da localização;

    A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon;

Teste se o usuário pode favoritar um pokémon através da página de detalhes.

    A página deve exibir um checkbox que permite favoritar o Pokémon;

    Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;

    O label do checkbox deve conter o texto Pokémon favoritado?
*/
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

import pokemons from '../data';
// import PokemonDetails from '../components/PokemonDetails';

const firstPokemon = pokemons[0];
const MoreDetails = 'More details';
const PokemonFavoritado = 'Pokémon favoritado?';

function goToDetails() {
  renderWithRouter(<App />);
  const detailsLink = screen.getByText(MoreDetails);
  userEvent.click(detailsLink);
}

describe('7.1-Teste se as informações detalhadas do Pokémon selecionado são mostradas '
+ 'na tela', () => {
  it('A página deve conter um texto <name> Details', () => {
    goToDetails();
    const detailsName = screen.getByText(`${firstPokemon.name} Details`);
    expect(detailsName).toBeInTheDocument();
  });
  it('Não deve existir link de navegação para os detalhes do Pokémon selecionado', () => {
    renderWithRouter(<App />);
    let detailsLink = screen.queryByText(MoreDetails);
    userEvent.click(detailsLink);
    detailsLink = screen.queryByText(MoreDetails);
    expect(detailsLink).toBeNull();
  });
  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    goToDetails();
    const headingSummary = screen.getByRole('heading', { name: 'Summary' });
    expect(headingSummary).toBeInTheDocument();
  });
  it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon '
+ 'específico sendo visualizado', () => {
    goToDetails();
    const summary = screen.getByText(firstPokemon.summary);
    expect(summary).toBeInTheDocument();
  });
});

describe('7.2-Teste se existe na página uma seção com os mapas contendo as '
+ 'localizações do pokémon', () => {
  it('Na seção de detalhes deverá existir um heading h2 com o texto Game Locations '
+ 'of <name>; onde <name> é o nome do Pokémon exibido', () => {
    goToDetails();
    const gameLocationsHeading = screen.getByRole(
      'heading', { name: `Game Locations of ${firstPokemon.name}` },
    );
    expect(gameLocationsHeading).toBeInTheDocument();
  });
  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
    goToDetails();
    const { foundAt } = firstPokemon;
    foundAt.forEach(({ location }) => {
      const locationElement = screen.getByText(location);
      expect(locationElement).toBeInTheDocument();
    });
  });
  it('A imagem da localização deve ter um atributo src com a URL da localização', () => {
    goToDetails();
    const { foundAt } = firstPokemon;
    const locationImgs = screen.getAllByAltText(`${firstPokemon.name} location`);
    foundAt.forEach(({ map }, index) => {
      expect(locationImgs[index]).toHaveAttribute('src', map);
    });
  });
  it('A imagem da localização deve ter um atributo alt com o texto <name> location, '
+ 'onde <name> é o nome do Pokémon', () => {
    goToDetails();
    const locationImgs = screen.queryAllByAltText(`${firstPokemon.name} location`);
    expect(locationImgs).not.toBeNull();
  });
});

describe('7.3-Teste se o usuário pode favoritar um pokémon através da página '
+ 'de detalhes', () => {
  it('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    goToDetails();
    const checkboxByRole = screen.getByRole('checkbox');
    const checkboxByLabel = screen.getByLabelText(PokemonFavoritado);
    expect(checkboxByRole).toBeInTheDocument();
    expect(checkboxByLabel).toBeInTheDocument();
    expect(checkboxByLabel).toEqual(checkboxByRole);
  });
  it('Cliques alternados no checkbox devem adicionar e remover respectivamente o '
+ 'Pokémon da lista de favoritos', () => {
    goToDetails();
    const checkbox = screen.getByLabelText(PokemonFavoritado);
    //
    let isFavorite = screen.queryByAltText(`${firstPokemon.name} is marked as favorite`);
    expect(isFavorite).toBeNull();
    userEvent.click(checkbox);
    //
    isFavorite = screen.queryByAltText(`${firstPokemon.name} is marked as favorite`);
    expect(isFavorite).not.toBeNull();
    userEvent.click(checkbox);
    //
    isFavorite = screen.queryByAltText(`${firstPokemon.name} is marked as favorite`);
    expect(isFavorite).toBeNull();
  });
  it('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
    goToDetails();
    const checkbox = screen.getByLabelText(PokemonFavoritado);
    expect(checkbox).toBeInTheDocument();
  });
});
