import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dataPipe' })

export class FilterPipe implements PipeTransform {
  transform(array: any[], query: string): any {
    if (query) {
      query = query.toLowerCase();
      return array.filter((value: any, index: number, arr: any) =>
        value.name.toLowerCase().indexOf(query) > -1);
    }
    return array;
  }
}

// @Pipe({
//   name: 'dataFilter'
// })
// export class FilterPipe implements PipeTransform {

//   transform(clientes: any, search: any): any {
//     if (search === undefined) return clientes;
//       return clientes.filter((cliente) => {
//           return cliente.email.toLowerCase().includes(search.toLowerCase());
//       });
//   }

// }
