import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

import pokemons from '../data';

const pokemonTypes = [
  ...new Set(pokemons.reduce((types, { type }) => [...types, type], [])),
];
const PokemonNameId = 'pokemon-name';
const PokemonTypeId = 'pokemon-type';
//
const pokemonTypeButtonId = 'pokemon-type-button';
const ProximoPokemon = 'Próximo pokémon';

describe('5.1-Testa o componente <Pokedex.js />', () => {
  it('se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const headings = screen
      .getAllByRole('heading', { level: 2, name: 'Encountered pokémons' });
    headings.forEach((heading) => expect(heading).toBeInTheDocument());
  });
});

describe('5.2-Teste se é exibido o próximo Pokémon da lista quando o botão '
+ 'Próximo pokémon é clicado', () => {
  it('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByRole('button', { name: ProximoPokemon });
    expect(nextPokemon).toBeInTheDocument();
  });
  it('Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar '
+ 'sucessivamente no botão', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: ProximoPokemon });
    pokemons.forEach((pokemon) => {
      const pokemonElement = screen.getByTestId(PokemonNameId);
      expect(pokemonElement).toHaveTextContent(pokemon.name);
      userEvent.click(nextButton);
    });
  });
  it('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, '
+ 'se estiver no último Pokémon da lista', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: ProximoPokemon });
    const numberOfClicks = pokemons.lenght;
    for (let counter = 0; counter < numberOfClicks; counter += 1) {
      userEvent.click(nextButton); // Clica no botão quantas vezes for o número de pokemons
    }
    const pokemonElement = screen.getByTestId(PokemonNameId);
    expect(pokemonElement).toHaveTextContent(pokemons[0].name);
  });
});

describe('Testa se é mostrado apenas um Pokémon por vez', () => {
  renderWithRouter(<App />);
  const pokemonElements = screen.getAllByTestId(PokemonNameId);
  expect(pokemonElements).toHaveLength(1);
});

describe('Testa se a Pokédex tem os botões de filtro', () => {
  it('Deve existir um botão de filtragem pra cada tipo de Pokémon, sem repetição', () => {
    renderWithRouter(<App />);
    const typeBtns = screen.getAllByTestId(pokemonTypeButtonId);
    expect(typeBtns).toHaveLength(pokemonTypes.length);
  });
  it('A partir da seleção de um botão de tipo, a Pokédex deve circular '
+ 'somente pelos pokémons daquele tipo', () => {
    renderWithRouter(<App />);
    const typeBtns = screen.getAllByTestId(pokemonTypeButtonId);
    const nextButton = screen.getByRole('button', { name: ProximoPokemon });
    typeBtns.forEach((typeBtn) => {
      userEvent.click(typeBtn);
      const buttonText = typeBtn.innerHTML;
      for (let i = 0; i < pokemonTypes.length; i += 1) {
        const pokemonTypeElement = screen.getByTestId(PokemonTypeId);
        expect(pokemonTypeElement).toHaveTextContent(buttonText);
        userEvent.click(nextButton);
      }
    });
  });
  it('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    renderWithRouter(<App />);
    const typeBtns = screen.getAllByTestId(pokemonTypeButtonId);
    typeBtns.forEach((typeBtn) => {
      userEvent.click(typeBtn);
      const buttonText = typeBtn.innerHTML;
      const pokemonTypeElement = screen.getByTestId(PokemonTypeId);
      expect(pokemonTypeElement).toHaveTextContent(buttonText);
    });
  });
  it('O botão All precisa estar sempre visível', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeDefined();
    //    expect(allButton).toBeInTheDocument();
  });
});

describe('Testa se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser All', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
  });
  it('A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o '
+ 'botão All for clicado', () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByRole('button', { name: ProximoPokemon });
    const allButton = screen.getByRole('button', { name: 'All' });
    const typeBtns = screen.getAllByTestId(pokemonTypeButtonId);
    userEvent.click(typeBtns[0]); // clica no primeiro botão de tipo.
    userEvent.click(allButton); // clica no botão de todos os tipos (All).
    pokemons.forEach(({ type }) => {
      const pokemonTypeElement = screen.getByTestId(PokemonTypeId);
      expect(pokemonTypeElement).toHaveTextContent(type);
      userEvent.click(buttonNextPokemon);
    });
  });
  it('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByRole('button', { name: ProximoPokemon });
    pokemons.forEach((pokemon) => {
      const pokemonTypeElement = screen.getByTestId(PokemonTypeId);
      expect(pokemonTypeElement).toHaveTextContent(pokemon.type);
      userEvent.click(buttonNextPokemon);
    });
  });
});
