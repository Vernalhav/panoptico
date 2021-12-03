// ============= TODO GIGANTE AQUI VÉI ===================

// import { SubjectService } from 'src/services/subject.service';

// describe('TopicService', () => {
//   let topicService: SubjectService;
//   let allSubjects: string[];
  
//   beforeEach(() => {
//     topicService = new SubjectService();
//     allSubjects = [
//       'Relações Internacionais e Comércio Exterior', 'Saúde', 
//       'Defesa e Segurança', 'Trabalho e Emprego', 
//       'Turismo'
//     ].sort();
    
//     jest.spyOn(topicService, 'getAll').mockImplementation(async () => Promise.resolve(allSubjects));
//   });

//   describe('getByRegexList', () => {
//     it('should return all subjects', async () => {
//       const regExArray = ['.*'];
      
//       const expected = allSubjects;
//       const received = (await topicService.getByRegexList(regExArray)).sort();
      
//       expect(received).toEqual(expected);
//     });
//   });

//   describe('getByRegexList', () => {
//     it('should return all subjects starting with T', async () => {
//       const regExArray = ['^T'];
      
//       const expected = ['Trabalho e Emprego', 'Turismo'].sort();
//       const received = (await topicService.getByRegexList(regExArray)).sort();
      
//       expect(received).toEqual(expected);
//     });
//   });

//   describe('getByRegexList', () => {
//     it('should return all subjects starting with T or S', async () => {
//       const regExArray = ['^T', '^S'];
      
//       const expected = ['Trabalho e Emprego', 'Turismo', 'Saúde'].sort();
//       const received = (await topicService.getByRegexList(regExArray)).sort();
      
//       expect(received).toEqual(expected);
//     });
//   });

//   describe('getByRegexList', () => {
//     it('should return an empty array when filtering with invalid RegEx only', async () => {
//       const regExArray = ['*'];
      
//       const expected = [];
//       const received = await topicService.getByRegexList(regExArray);
      
//       expect(received).toEqual(expected);
//     });
//   });

//   describe('getByRegexList', () => {
//     it('should return an empty array', async () => {
//       const regExArray = ['Política.*', 'Educação.*', '^K'];
      
//       const expected = [];
//       const received = await topicService.getByRegexList(regExArray);
      
//       expect(received).toEqual(expected);
//     });
//   });

//   describe('getByRegexList', () => {
//     it('should return an array with subjects starting with T and ignore the invalid RegEx', async () => {
//       const regExArray = ['*', '^T'];
      
//       const expected = ['Trabalho e Emprego', 'Turismo'].sort();
//       const received = (await topicService.getByRegexList(regExArray)).sort();
      
//       expect(received).toEqual(expected);
//     });
//   });

//   describe('getByRegexList', () => {
//     it('should return an empty array', async () => {
//       const regExArray = [];
      
//       const expected = [];
//       const received = await topicService.getByRegexList(regExArray);
      
//       expect(received).toEqual(expected);
//     });
//   });
// });