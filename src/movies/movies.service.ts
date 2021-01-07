import { Movie } from './entities/movie.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  // 모든 영화를 가져옴
  getAll(): Movie[] {
    return this.movies;
  }

  // 영화 검색 기존에 있었던 movie.id(number)을 파라미터(id: string) to numberㄹ로 변환
  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  // 영화 삭제 해당 아이디와 일치하지 않는 obj들만 뽑아서 다시 객체를 만듦
  deleteOne(id: number) {
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }

  // 영화를 추가하고 id를 기존에 있는 영화 객체의 개수에서 +1한 값을 id로 할당함
  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData: CreateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
