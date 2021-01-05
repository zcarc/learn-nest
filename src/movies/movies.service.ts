import { Movie } from './entities/movie.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {
  private movies: Movie[];

  // 모든 영화를 가져옴
  getAll(): Movie[] {
    return this.movies;
  }

  // 영화 검색 기존에 있었던 movie.id(number)을 파라미터(id: string) to numberㄹ로 변환
  getOne(id: string): Movie {
    return this.movies.find((movie) => movie.id === +id);
  }

  // 영화 삭제 해당 아이디와 일치하지 않는 obj들만 뽑아서 다시 객체를 만듦
  deleteOne(id: string): boolean {
    this.movies.filter((movie) => movie.id !== +id);
    return true;
  }

  // 영화를 추가하고 id를 기존에 있는 영화 객체의 개수에서 +1한 값을 id로 할당함
  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
}
