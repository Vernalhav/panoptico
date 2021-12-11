import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SubjectService } from 'src/services';
import { Subject } from 'src/entities';

describe('Subject Service', () => {
  let service: SubjectService;
  const allSubjects: Subject[] = [
    { id: 0, votings: [], name: 'Relações Internacionais e Comércio Exterior' },
    { id: 1, votings: [], name: 'Saúde' },
    { id: 2, votings: [], name: 'Defesa e Segurança' },
    { id: 3, votings: [], name: 'Trabalho e Emprego' },
    { id: 4, votings: [], name: 'Turismo' },
  ];

  const mockedRepo = {
    find: jest.fn((id) => Promise.resolve(allSubjects)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectService,
        // Mock repository
        {
          provide: getRepositoryToken(Subject),
          useValue: mockedRepo,
        },
      ],
    }).compile();

    service = await module.get(SubjectService);
  });

  describe('getByRegexList', () => {
    it('should return all subjects', async () => {
      const regExArray = ['.*'];

      const expected = allSubjects;
      const received = (await service.getFilteredByName([], regExArray)).sort();

      expect(received).toEqual(expected);
    });
  });

  describe('getByRegexList', () => {
    it('should return all subjects starting with T', async () => {
      const regExArray = ['^T'];

      const expected = [
        { id: 3, votings: [], name: 'Trabalho e Emprego' },
        { id: 4, votings: [], name: 'Turismo' },
      ];

      const received = await service.getFilteredByName([], regExArray);

      expect(received).toEqual(expected);
    });
  });

  describe('getByRegexList', () => {
    it('should return all subjects starting with T or S', async () => {
      const regExArray = ['^T', '^S'];

      const expected = [
        { id: 1, votings: [], name: 'Saúde' },
        { id: 3, votings: [], name: 'Trabalho e Emprego' },
        { id: 4, votings: [], name: 'Turismo' },
      ];
      const received = await service.getFilteredByName([], regExArray);

      expect(received).toEqual(expected);
    });
  });

  describe('getByRegexList', () => {
    it('should return an empty array when filtering with invalid RegEx only', async () => {
      const regExArray = ['*'];

      const expected = [];
      const received = (await service.getFilteredByName([], regExArray)).sort();

      expect(received).toEqual(expected);
    });
  });

  describe('getByRegexList', () => {
    it('should return an empty array', async () => {
      const regExArray = ['Política.*', 'Educação.*', '^K'];

      const expected = [];
      const received = (await service.getFilteredByName([], regExArray)).sort();

      expect(received).toEqual(expected);
    });
  });

  describe('getByRegexList', () => {
    it('should return an array with subjects starting with T and ignore the invalid RegEx', async () => {
      const regExArray = ['*', '^T'];

      const expected = [
        { id: 3, votings: [], name: 'Trabalho e Emprego' },
        { id: 4, votings: [], name: 'Turismo' },
      ];
      const received = (await service.getFilteredByName([], regExArray)).sort();

      expect(received).toEqual(expected);
    });
  });

  describe('getByRegexList', () => {
    it('should return an empty array', async () => {
      const regExArray = [];

      const expected = [];
      const received = (await service.getFilteredByName([], regExArray)).sort();

      expect(received).toEqual(expected);
    });
  });
});
