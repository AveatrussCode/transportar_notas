#include <iostream>
#include <fstream>
#include <string>

using namespace std;

void imprimir_transporte(string n[20], string v[20]){{
    int i =0;
    while (n[i] != " "){
        cout<< n[i] <<" -> "<<  v[i]<<endl; 
        i++;
    }
}

}
void transportar(string n[20], int s, string t[20]) {

    string notas_musicales[12] = {
        "do","do#","re","re#",
        "mi","fa","fa#",
        "sol","sol#","la","la#","si"
    };

    int i = 0;

    while (n[i] != " ") {

        int id_nota = -1;

        for (int j = 0; j < 12; j++) {
            if (n[i] == notas_musicales[j]) {
                id_nota = j;
                break;
            }
        }
        int nueva = (id_nota + s) % 12;
        t[i] = notas_musicales[nueva];
        i++;
    }
}

int main() {
    int semitonos;
    cin>>semitonos;
    ifstream archivo("notas.txt");
    string linea;
    string notas[20]= {" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "};
    getline(archivo, linea);
    string palabra;
    int i =0;
    for (char c : linea) {
        if (c == ' ') {
            notas[i] = palabra;
            palabra = "";
            i++;

        }
        else {
            palabra += c;        
        }
    }
    notas[i] = palabra;
    string transportado[20];
    transportar(notas,semitonos, transportado);
    imprimir_transporte( notas, transportado);

    cout << "---- fin de linea ----\n";

    archivo.close();

    return 0;
}