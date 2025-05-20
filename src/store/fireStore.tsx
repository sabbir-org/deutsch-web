import { create } from "zustand";
import {
  collection,
  doc,
  getDoc,
  // getDocs,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

type ConvoStore = {
  conversations: any[];
  currentConversation: any | null;
  loading: boolean;

  solutions: any[];
  // fetchConversations: () => Promise<void>;
  fetchConversations: () => Unsubscribe; // <-- change from Promise<void> to Unsubscribe
  fetchConversationById: (id: string) => Promise<void>;
  fetchSolutions: () => Promise<void>; // <-- change from Promise<void> to Unsubscribe
  fetchSolutionById: (id: string) => Promise<void>;
};

const useFireStore = create<ConvoStore>((set) => ({
  conversations: [],
  solutions: [],
  currentConversation: null,
  loading: true,

  fetchConversations: () => {
    const unsubscribe = onSnapshot(
      collection(db, "aufgabehoren"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        set({ conversations: data, loading: false });
        console.log("Realtime conversations updated");
      },
      (error) => {
        console.error("Error fetching realtime conversations:", error);
        set({ loading: false });
      }
    );

    return unsubscribe; // You can call this later to stop listening
  },

  fetchConversationById: async (id) => {
    set({ loading: true });
    try {
      const docRef = doc(db, "aufgabehoren", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({
          currentConversation: { id: docSnap.id, ...docSnap.data() },
          loading: false,
        });
      } else {
        set({ currentConversation: null, loading: false });
      }
    } catch (err) {
      console.error("Error fetching conversation:", err);
      set({ loading: false });
    }
  },

  fetchSolutions: async () => {
    set({
      solutions: [
        {
          id: "1",
          name: "Hallo und Guten tag",
          solves: [
            {
              number: 5,
              aufgabe: [
                {
                  task: "b",
                  ans: [
                    "ich: heiße, komme, wohne",
                    "du: heißt, kommst, wohnst",
                    "Sie: heißen, kommen, wohnen",
                  ],
                },
              ],
            },
            {
              number: 7,
              aufgabe: [
                {
                  task: "",
                  ans: [
                    "Eva: Guten Tag. Mein Name ist Eva. Wie heißt du?",
                    "Eduardo: Ich heiße Eduardo",
                    "Eva: Woher kommst du, Eduardo?",
                    "Eduardo: Ich komme aus Spanien. Und du?",
                    "Eva: Ich komme aus Deutschland. Ich wohne in Köln. Und wo wohnst du?",
                    "Eduardo: Ich wohne in Sevilla.",
                  ],
                },
              ],
            },
            {
              number: 9,
              aufgabe: [
                {
                  task: "b",
                  ans: [
                    "Städte in Deutschland: Hamburg, Leipzig, Stuttgart, Berlin, Köln, Frankfurt, München",
                    "Städte in Österreich: Linz, Wien, Innsbruck",
                    "Städte in der Schweiz: Bern, Zürich, Genf, Basel",
                  ],
                },
              ],
            },
            {
              number: 11,
              aufgabe: [
                {
                  task: "",
                  ans: [
                    "2. kommt, in",
                    "3. aus, Er, lernt",
                    "4. ist, aus, spricht",
                    "6. kommen, wohnen, lernen, gern",
                    "7. sind, und, sprechen, Sie",
                  ],
                },
              ],
            },
            {
              number: 13,
              aufgabe: [
                {
                  task: "",
                  ans: [
                    "Ich spiele (nicht so) gern Computerspiele.",
                    "Ich spiele (nicht so) gern Tennis.",
                    "Ich höre (nicht so) gern Musik.",
                    "Ich lerne (nicht so) gern Deutsch.",
                    "Ich spiele (nicht so) gern Fußball.",
                    "Ich tanze (nicht so) gern.",
                    "Ich wohne (nicht so) gern in …",
                    "Ich fotografiere (nicht so) gern.",
                    "Ich koche (nicht so) gern.",
                  ],
                },
              ],
            },
            {
              number: 15,
              aufgabe: [
                {
                  task: "",
                  ans: [
                    "Das ist Franz. Er kommt aus Deutschland. Er wohnt in München. Er spricht Deutsch. Er spielt gern Fußball.",
                    "Das ist Martina. Sie kommt aus der Schweiz. Sie wohnt in Bern. Sie spricht Deutsch und Französisch. Sie lernt gern Sprachen.",
                    "Das sind Lars, Rasmus und Johan. Sie kommen aus Dänemark. Sie wohnen in Kopenhagen. Sie sprechen Dänisch, Schwedisch und Englisch. Sie spielen gern Jazz.",
                  ],
                },
              ],
            },
            {
              number: 17,
              aufgabe: [
                {
                  task: "b",
                  ans: [
                    "Welche Sprachen sprechen Sie?",
                    "Sprechen Sie Russisch?",
                    "Sprichst du Polnisch?",
                  ],
                },
              ],
            },
            {
              number: 18,
              aufgabe: [
                {
                  task: "c",
                  ans: [
                    "Ja, wir sprechen Englisch.",
                    "Ja, wir kochen gern.",
                    "Ja, ich lerne Deutsch.",
                    "Nein, wir wohnen in Athen.",
                    "Ja, ich höre gern Musik.",
                    "Nein, wir machen lieber Gymnastik.",
                    "Ja, ich fotografiere gern.",
                    "Nein, wir kommen aus Schweden.",
                  ],
                },
                {
                  task: "d",
                  ans: ["1. du 2. ihr 3. Er 4. Wir 5. Sie 6. Ich"],
                },
              ],
            },

            {
              number: 19,
              aufgabe: [
                {
                  task: "a",
                  ans: [
                    "1. kommt, kommen",
                    "2. Wohnt, wohnen",
                    "3. macht, lernen",
                    "4. sprecht, sprechen",
                  ],
                },
                {
                  task: "b",
                  ans: [
                    "Wir wohnen in Prag.",
                    "Woher kommt ihr?",
                    "Welche Sprachen sprecht ihr noch?",
                    "Wohnt ihr in Prag?",
                  ],
                },
                {
                  task: "c",
                  ans: [
                    "1. Er wohnt in Athen.",
                    "2. Ich spreche Spanisch.",
                    "3. Wo wohnst du?",
                    "4. Wir lernen jetzt Deutsch.",
                    "5. Fotografiert ihr gern?",
                  ],
                },
              ],
            },

            {
              number: 20,
              aufgabe: [
                {
                  task: "a",
                  ans: [
                    "1. Woher kommst du?/Woher kommen Sie?",
                    "2. Wo wohnst du?/Wo wohnen Sie?",
                    "3. Was machst du gern?/Was machen Sie gern?",
                    "4. Welche Sprachen sprichst du?/Welche Sprachen sprechen Sie?",
                    "5. Sprichst du ein bisschen Spanisch?/Sprechen Sie ein bisschen Spanisch?",
                  ],
                },
                {
                  task: "b",
                  ans: [
                    "A: Wie heißen Sie?",
                    "B: Ich heiße Paola Gomez. Und Sie?",
                    "A: Ich heiße Max Müller.",
                    "B: Woher kommen Sie?",
                    "A: Ich komme aus Deutschland. Und Sie?",
                    "B: Ich komme aus Spanien.",
                    "A: Wo wohnen Sie?",
                    "B: Ich wohne in Madrid. Und Sie?",
                    "A: Ich wohne in München.",
                    "B: Was machen Sie gern?",
                    "A: Ich schwimme gern. Und Sie?",
                    "B: Ich spiele gern Tennis.",
                    "A: Welche Sprachen sprechen Sie?",
                    "B: Ich spreche Spanisch, Französisch und Englisch. Und Sie?",
                    "A: Ich spreche Deutsch, Englisch und ein bisschen Spanisch.",
                  ],
                },
              ],
            },
            {
              number: 22,
              aufgabe: [
                {
                  task: "Begrüßung:",
                  ans: ["1. Hallo! 2. Grüß Gott! 3. Servus! 4. Guten Tag!"],
                },
                {
                  task: "Verabschiedung:",
                  ans: ["1. Servus! 2. Tschüss! 3. Auf Wiedersehen!"],
                },
              ],
            },

            {
              number: "Ü1",
              aufgabe: [
                {
                  task: "",
                  ans: [
                    "1. Guten Tag! 2. Tschüss! 3. Danke. – Bitte. 5. Guten Abend! 6. Gute Nacht!",
                  ],
                },
              ],
            },
            {
              number: "Ü2",
              aufgabe: [
                {
                  task: "",
                  ans: [
                    "Florian: Hallo! Ich bin Florian. Wie heißt du?",
                    "Lena: Ich heiße Lena.",
                    "Florian: Woher kommst du, Lena?",
                    "Lena: Ich komme aus Polen. Und du?",
                    "Florian: Ich komme aus der Schweiz. Ich wohne in Basel. Und wo wohnst du?",
                    "Lena: Ich wohne in Warschau.",
                  ],
                },
              ],
            },
            {
              number: "Ü3",
              aufgabe: [
                {
                  task: "",
                  ans: [
                    "1. Frau Gruber spielt gern Tennis.",
                    "2. Herr Graf fotografiert gern.",
                    "3. Herr Steiner kocht gern.",
                    "4. Franzi und Emma schwimmen gern.",
                  ],
                },
              ],
            },
            {
              number: "Ü4",

              aufgabe: [
                {
                  task: "",
                  ans: [
                    "1. Du kommst aus Deutschland.",
                    "2. Er wohnt in München.",
                    "3. Ihr sprecht Deutsch und Englisch.",
                    "4. Anna spielt Fußball.",
                    "5. Wir kochen gern.",
                    "6. Das sind Alexis und Yanis.",
                  ],
                },
              ],
            },
            {
              number: "Ü5",

              aufgabe: [
                {
                  task: "",
                  ans: [
                    "Susanne: Hallo, ich bin Susanne.",
                    "Marie: Hallo, ich bin Marie, das ist Adam. Woher kommst du, Susanne?",
                    "Susanne: Ich komme aus Österreich, aus Wien. Und ihr? Woher kommt ihr?",
                    "Adam: Wir kommen aus Tschechien.",
                    "Susanne: Ah, aus Tschechien! Wohnt ihr in Prag?",
                    "Adam: Ja, wir wohnen in Prag.",
                    "Susanne: Was macht ihr hier in Berlin?",
                    "Marie: Wir lernen Deutsch.",
                    "Susanne: Toll! Welche Sprachen sprecht ihr noch?",
                    "Marie: Wir sprechen Tschechisch, Englisch und ein bisschen Russisch. Und du?",
                    "Susanne: Ich spreche Deutsch, Englisch und auch ein bisschen Russisch.",
                    "Marie: Du sprichst Russisch! Interessant!",
                  ],
                },
              ],
            },
            {
              number: "Ü6",

              aufgabe: [
                {
                  task: "",
                  ans: [
                    "1. Woher 2. du 3. Welche 4. Was 5. in 6. ihr 7. sprecht 8. ihr 9. Spielt 10. heißen 11. Sie 12. machen 13. kommen 14. gern",
                  ],
                },
              ],
            },
            {
              number: "Ü7",

              aufgabe: [
                {
                  task: "",
                  ans: [
                    "1. spielen: Klavier, Tennis, Fußball, Volleyball",
                    "2. sprechen: Dänisch, Portugiesisch, Japanisch",
                    "3. lernen: Deutsch, schwimmen, sprechen",
                  ],
                },
              ],
            },
            {
              number: "Ü8",

              aufgabe: [
                {
                  task: "",
                  ans: [
                    "1. Wohnen Sie in Helsinki? – Nein, wir wohnen in Oslo.",
                    "2. Lernt ihr Deutsch? – Nein, wir lernen Russisch.",
                    "3. Kocht Laura gern? – Nein, sie macht lieber Sport.",
                    "4. Spielt Oliver gern Fußball? – Nein, er schwimmt lieber.",
                    "5. Ist Kathrin in Deutschland? – Nein, sie ist in Amerika.",
                    "6. Kommen Carla und Norbert aus Zürich? – Nein, sie kommen aus Basel.",
                    "7. Sprechen Sie Französisch? – Nein, ich spreche Englisch und Deutsch.",
                  ],
                },
              ],
            },
            {
              number: "Ü9",

              aufgabe: [
                {
                  task: "",
                  ans: [
                    "1. Woher kommen Sie? – Ich komme aus Österreich.",
                    "2. Wo wohnen Sie? – Ich wohne in Wien.",
                    "3. Welche Sprachen sprechen Sie? – Ich spreche Deutsch und Englisch.",
                    "4. Was lernen Sie jetzt? – Ich lerne jetzt Japanisch.",
                    "5. Was machen Sie gern? – Ich koche und schwimme gern.",
                  ],
                },
              ],
            },
            {
              number: "Ü10",

              aufgabe: [
                {
                  task: "",
                  ans: [
                    " Das ist Diego Perez. Diego kommt aus Chile. Er wohnt in Santiago de Chile. Diego spricht Spanisch und Französisch. Er lernt jetzt Deutsch. Er spielt gern Gitarre und hört gern Musik.",
                  ],
                },
                {
                  task: "",
                  ans: [
                    "Das ist Tatjana Smirnow. Tatjana kommt aus Russland. Sie wohnt in Moskau. Tatjana spricht Russisch und Englisch. Sie lernt jetzt Deutsch. Sie spielt gern Tennis. Sie fotografiert gern. ",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "2",
          name: "Beruf und Familie",
          solves: [
            {
              number: "Ü10",

              aufgabe: [
                {
                  task: "",
                  ans: [],
                },
              ],
            },
          ],
        },
        {
          id: "3",
          name: "In der Stadt",
          solves: [{}],
        },
        {
          id: "4",
          name: "Von morgens bis abends",
          solves: [
            {
              number: "1",

              aufgabe: [
                {
                  task: "b",
                  ans: [
                    "1. lernt",
                    "2. macht ",
                    "3. fährt",
                    "4. geht",
                    "5. schreibt",
                    "6. telefoniert",
                    "7. hat",
                    "8. macht",
                  ],
                },
              ],
            },

            {
              number: 2,
              aufgabe: [
                {
                  task: "b",
                  ans: [
                    "Es ist zehn nach zehn. Der Unterricht beginnt um 10.10 Uhr.",
                    "Es ist fünf vor zwölf. Der Unterricht beginnt um 11.55 Uhr.",
                    "Es ist zwei Uhr. Der Unterricht beginnt um 14 Uhr.",
                    "Es ist halb vier. Der Unterricht beginnt um 15.30 Uhr.",
                    "Es ist viertel vor sechs. Der Unterricht beginnt um 17.45 Uhr.",
                    "Es ist zwanzig nach sechs. Der Unterricht beginnt um 18.20 Uhr.",
                  ],
                },
                {
                  task: "c",
                  ans: [
                    "1. 8.00 Uhr",
                    "2. 11.30 Uhr",
                    "3. 12.45 Uhr",
                    "4. 15.30 Uhr",
                    "5. 10.00 Uhr",
                    "6. 17.15 Uhr",
                  ],
                },
              ],
            },

            {
              number: 3,
              aufgabe: [
                {
                  task: "",
                  ans: [
                    "1. Wann gehst du ins Museum? – Ich gehe um 11.30 Uhr ins Museum.",
                    "2. Wann trinkst du Kaffee? – Ich trinke um 14.15 Uhr Kaffee.",
                    "3. Wann beginnt der Unterricht? – Der Unterricht beginnt um 17.00 Uhr.",
                    "4. Wann ist die Pause? – Die Pause ist um 18.30 Uhr.",
                    "5. Wann spielst du Fußball? – Ich spiele um 20.00 Uhr Fußball.",
                  ],
                },
              ],
            },

            {
              number: 4,
              aufgabe: [
                {
                  task: "b",
                  ans: [
                    "1. Das Konzert dauert 2 1/2 (zweieinhalb) Stunden./Es geht von 19.30 bis 22.00 Uhr.",
                    "2. Der Chef fährt um 16.30 Uhr nach Berlin.",
                    "3. Die Fahrt dauert drei Stunden.",
                    "4. Die Videokonferenz beginnt um 10.00 Uhr.",
                    "5. Der Unterricht beginnt um 18.30 Uhr.",
                    "6. Der Unterricht dauert 2 1/2 (zweieinhalb) Stunden.",
                    "7. Das Fußballspiel ist um 16.30 Uhr zu Ende.",
                  ],
                },
                {
                  task: "c",
                  ans: [
                    "1. Wie lange dauert die Pause? – Die Pause dauert eine Stunde.",
                    "2. Wie lange dauert die Besprechung? – Die Besprechung dauert drei Stunden.",
                    "3. Wie lange lernst du heute für die Prüfung? – Ich lerne heute vier Stunden.",
                    "4. Wie lange fährt Frau Müller nach Hause? – Frau Müller fährt 15 Minuten.",
                    "5. Bis wann geht deine Präsentation? – Meine Präsentation geht bis 15.50 Uhr.",
                  ],
                },
              ],
            },

            {
              number: 9,
              aufgabe: [
                {
                  task: "ich-Laut",
                  ans: [
                    "welche",
                    "Unterricht",
                    "persönlich",
                    "ich",
                    "Nächte",
                    "Bericht",
                    "sechzehn",
                    "Besprechung",
                    "vielleicht",
                    "möchte",
                    "Bücher",
                    "Brötchen",
                  ],
                },
                {
                  task: "ach-Laut",
                  ans: [
                    "nach",
                    "Nachmittag",
                    "Nacht",
                    "machen",
                    "kochen",
                    "Kuchen",
                    "Buch",
                    "auch",
                  ],
                },
              ],
            },

            {
              number: 10,
              aufgabe: [
                {
                  task: "a",
                  ans: [
                    "1. keine Zeit",
                    "2. Büro, 14.00 bis 15.00 Uhr, Donnerstag",
                    "3. Freitag, 16.00 Uhr",
                  ],
                },
              ],
            },

            {
              number: 12,
              aufgabe: [
                {
                  task: "b",
                  ans: [
                    "1. Wir können am Freitag zusammen Hausaufgaben machen.",
                    "2. Du kannst die E-Mail morgen schreiben.",
                    "3. Klaus kann sein Projekt schon am Mittwoch präsentieren.",
                    "4. Wir können am Samstag zusammen kochen.",
                    "5. Wann können wir zusammen nach Wien fahren?",
                    "6. Vielleicht können wir am Sonntag zusammen ein Bier trinken.",
                    "7. Kannst du am Freitag?",
                  ],
                },
              ],
            },

            {
              number: 14,
              aufgabe: [
                {
                  task: "c",
                  ans: [
                    "1. arbeiten",
                    "2. aufstehen",
                    "3. frühstücken",
                    "4. machen",
                    "5. fahren",
                    "6. analysieren",
                    "7. schreiben",
                    "8. haben",
                    "9. anfangen",
                    "10. dauern",
                    "11. anrufen",
                    "12. einkaufen",
                    "13. kaufen",
                    "14. gehen",
                    "15. sein",
                    "16. besuchen",
                    "17. ausgehen",
                  ],
                },
              ],
            },

            {
              number: 15,
              aufgabe: [
                {
                  task: "",
                  ans: [
                    "ausgehen: geht aus",
                    "einkaufen: kauft ein",
                    "anrufen: ruft an",
                    "anfangen: fängt an",
                    "beginnen: beginnt",
                    "bedienen: bedient",
                    "bestellen: bestellt",
                    "bezahlen: bezahlt",
                    "besuchen: besucht",
                    "entwickeln: entwickelt",
                    "unterrichten: unterrichtet",
                    "untersuchen: untersucht",
                    "übernachten: übernachtet",
                  ],
                },
              ],
            },

            {
              number: 16,
              aufgabe: [
                {
                  task: "Beispielsätze",
                  ans: [
                    "1. Die Menschen in Österreich sehen montags bis freitags 2 Stunden fern. Am Wochenende sehen sie 2 ½ Stunden fern.",
                    "2. Montags bis freitags treiben sie 27 Minuten Sport. Am Wochenende treiben sie 45 Minuten Sport.",
                    "3. Am Wochenende sprechen sie etwa 2 Stunden mit Freunden / feiern sie etwa 2 Stunden Partys.",
                    "4. Täglich lesen sie 24 Minuten Bücher, Zeitungen oder Zeitschriften.",
                    "5. Junge Leute in Österreich spielen täglich 1 ½ Stunden Computerspiele.",
                    "6. Die Österreicher hören morgens 1 ½ Stunden Radio.",
                  ],
                },
              ],
            },

            {
              number: 18,
              aufgabe: [
                {
                  task: "a Fragen",
                  ans: [
                    "1. Wann frühstückst du?",
                    "2. Wie lange hörst du morgens Radio?",
                    "3. Wann fährst du ins Büro/zur Universität?",
                    "4. Wann fängt die Arbeit/der Unterricht an?",
                    "5. Wie lange machst du Mittagspause?",
                    "6. Wann kaufst du ein?",
                    "7. Wie lange siehst du fern?",
                    "8. Wie lange treibst du Sport?",
                    "9. Wann gehst du abends ins Bett?",
                  ],
                },
              ],
            },

            {
              number: 20,
              aufgabe: [
                {
                  task: "Beispielsätze",
                  ans: [
                    "Wann kaufst du ein? – Ich kaufe am Samstag ein.",
                    "Was machst du am Wochenende? – Am Wochenende spiele ich Fußball.",
                    "Wann machst du Mittagspause? – Ich mache um 12.00 Uhr Mittagspause.",
                    "Treibst du Sport? – Ja, ich spiele Tennis.",
                    "Wie lange siehst du abends fern? – Ich sehe abends vier Stunden fern.",
                    "Kochst du manchmal? – Ja, ich koche am Wochenende.",
                  ],
                },
              ],
            },

            {
              number: 21,
              aufgabe: [
                {
                  task: "",
                  ans: [
                    "beginnen",
                    "bezahlen",
                    "fernsehen",
                    "anrufen",
                    "besuchen",
                    "übernachten",
                    "bestellen",
                    "bedienen",
                    "entwickeln",
                    "einkaufen",
                    "unterrichten",
                    "anfangen",
                  ],
                },
              ],
            },

            {
              number: 22,
              aufgabe: [
                {
                  task: "Transkription Hörtext: Ein Telefongespräch mit Frau Müller",
                  ans: [
                    "Frau Müller: Müller.",
                    "Herr Gruber: Ja, guten Tag, Frau Müller, hier ist Otto Gruber.",
                    "Ich möchte bitte mit Frau Lustig sprechen.",
                    "Frau Müller: Ist es dringend?",
                    "Herr Gruber: Ja, ich möchte eine Projektidee vorstellen.",
                    "Ist es heute möglich?",
                    "Frau Müller: Also, am Vormittag hat Frau Lustig leider keine Zeit.",
                    "Um 9.00 Uhr hat Frau Lustig eine Besprechung mit dem Direktor.",
                    "Die Besprechung dauert zwei Stunden.",
                    "Um 11.00 Uhr hat Frau Lustig eine Telefonkonferenz und um 12.30 Uhr macht sie Mittagspause.",
                    "Herr Gruber: Und wie ist es am Nachmittag?",
                    "Hat Frau Lustig vielleicht am Nachmittag Zeit?",
                    "Frau Müller: Um 13.30 Uhr schreibt Frau Lustig einen Bericht,",
                    "um 14.30 Uhr telefoniert sie mit Kollegen in London",
                    "und um 16.00 Uhr fährt sie nach Berlin.",
                    "Sie können heute leider nicht mit Frau Lustig sprechen.",
                    "Herr Gruber: Und morgen?",
                    "Hat Frau Lustig vielleicht morgen Zeit?",
                    "Frau Müller: Morgen ist Samstag, Herr Gruber.",
                    "Sie können gerne am Montag wieder anrufen.",
                    "Dann ist meine Kollegin Katja Esser hier.",
                    "Herr Gruber: Gut, ich rufe am Montagvormittag wieder an.",
                    "Welche Telefonnummer hat Frau Esser?",
                    "Frau Müller: Moment … die Nummer von Frau Esser ist 7 63 54 26.",
                    "Herr Gruber: Ich wiederhole: 7 63 54 26.",
                    "Frau Müller: Ja. Viel Erfolg, Herr Gruber.",
                    "Herr Gruber: Vielen Dank. Auf Wiederhören!",
                  ],
                },

                {
                  task: "a",
                  ans: [
                    "9.00 Uhr",
                    "11.00 Uhr",
                    "Mittagspause",
                    "14.30 Uhr",
                    "in London",
                    "Berlin",
                  ],
                },
                {
                  task: "b",
                  ans: [
                    "1. dringend",
                    "2. eine Projektidee vorstellen",
                    "3. Zeit",
                    "4. Die Besprechung dauert",
                    "5. Mittagspause",
                    "6. einen Bericht",
                    "7. nach Berlin",
                    "8. Und morgen?",
                    "9. gerne am Montag",
                    "10. Welche Telefonnummer hat",
                    "11. Ich wiederhole",
                    "12. Viel Erfolg",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "5",
          name: "Essen und trinken",
          solves: [{}],
        },
      ],
    });
  },

  fetchSolutionById: async (id) => {},
}));

export default useFireStore;
