/* =========================================================
   MAUVITALITY
   Lógica de la experiencia de bienvenida
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTOS PRINCIPALES
       ===================================================== */

    const welcomeScreen = document.getElementById("welcome-screen");
    const welcomeIntro = document.getElementById("welcome-intro");
    const welcomeSurvey = document.getElementById("welcome-survey");
    const startButton = document.getElementById("start-experience");

    const wellState = document.getElementById("well-state");
    const exploreSiteNow = document.getElementById("explore-site-now");
    const continueExploring = document.getElementById("continue-exploring");

    const shareExperience = document.getElementById("share-experience");
    const shareFeedback = document.getElementById("share-feedback");

    const welcomeResult = document.getElementById("welcome-result");
    const enterSite = document.getElementById("enter-site");
    const saveConsent = document.getElementById("save-consent");


    /* =====================================================
       PROGRESO
       ===================================================== */

    const progressLabel =
        document.getElementById("progress-label");

    const progressPercent =
        document.getElementById("progress-percent");

    const progressFill =
        document.getElementById("progress-fill");


    /* =====================================================
       PREGUNTAS
       ===================================================== */

    const questions =
        document.querySelectorAll(".question");


    /* =====================================================
       PREGUNTA 2
       ===================================================== */

    const dimensionAnswers =
        document.querySelectorAll(".dimension-answer");

    const question2Next =
        document.getElementById("question-2-next");


    /* =====================================================
       PREGUNTA 3
       ===================================================== */

    const dynamicCategories =
        document.getElementById("dynamic-categories");

    const question3Next =
        document.getElementById("question-3-next");


    /* =====================================================
       PREGUNTA 4
       ===================================================== */

    const personalGoal =
        document.getElementById("personal-goal");

    const characterCount =
        document.getElementById("character-count");

    const question4Next =
        document.getElementById("question-4-next");


    /* =====================================================
       RESULTADO
       ===================================================== */

    const resultWellbeing =
        document.getElementById("result-wellbeing");

    const resultArea =
        document.getElementById("result-area");

    const resultNeed =
        document.getElementById("result-need");

    const resultGoal =
        document.getElementById("result-goal");

    const resultCommitment =
        document.getElementById("result-commitment");


    /* =====================================================
       DATOS DE LA EXPERIENCIA
       ===================================================== */

    const data = {

        bienestarInicial: "",

        dimensiones: [],

        necesidades: [],

        objetivo: "",

        compromiso: "",

        fechaInicio: null

    };


    /* =====================================================
       OPCIONES DE CADA DIMENSIÓN
       ===================================================== */

    const dimensionOptions = {

        "Físico": [
            "Mejorar mi salud",
            "Tener más energía",
            "Mejorar mi alimentación",
            "Dormir y descansar mejor",
            "Moverme más",
            "Recuperar mi condición física",
            "Otro"
        ],

        "Mental": [
            "Organizar mejor mis pensamientos",
            "Concentrarme mejor",
            "Aprender cosas nuevas",
            "Reducir el estrés",
            "Tener más claridad",
            "Desarrollar nuevos hábitos",
            "Otro"
        ],

        "Emocional": [
            "Sentirme más tranquilo/a",
            "Manejar mejor mis emociones",
            "Fortalecer mi autoestima",
            "Aprender a soltar",
            "Sentirme más motivado/a",
            "Conocerme mejor",
            "Otro"
        ],

        "Familiar": [
            "Mejorar la comunicación",
            "Compartir más tiempo",
            "Fortalecer mis relaciones",
            "Resolver diferencias",
            "Estar más presente",
            "Construir mejores momentos",
            "Otro"
        ],

        "Financiero": [
            "Organizar mis finanzas",
            "Administrar mejor mi dinero",
            "Reducir mis gastos",
            "Ahorrar",
            "Generar nuevas oportunidades",
            "Aprender sobre finanzas",
            "Otro"
        ]

    };


    /* =====================================================
       DESCRIPCIONES
       ===================================================== */

    const dimensionDescriptions = {

        "Físico":
            "Salud, energía y hábitos que apoyan tu día a día.",

        "Mental":
            "Pensamientos, aprendizaje, claridad y nuevos hábitos.",

        "Emocional":
            "Emociones, calma, autoestima y conocimiento personal.",

        "Familiar":
            "Relaciones, comunicación, presencia y momentos compartidos.",

        "Financiero":
            "Organización, oportunidades, administración y futuro."

    };


    /* =====================================================
       INICIO
       ===================================================== */

    function startExperience() {

        welcomeIntro.classList.add("hidden");

        welcomeSurvey.classList.add("active");

        showQuestion(1);

        updateProgress(1);

        document.body.classList.add("no-scroll");

    }


    if (startButton) {

        startButton.addEventListener(
            "click",
            startExperience
        );

    }


    /* =====================================================
       MOSTRAR UNA PREGUNTA
       ===================================================== */

    function showQuestion(number) {

        questions.forEach(function (question) {

            question.classList.remove("active");

        });

        const selectedQuestion =
            document.getElementById(
                "question-" + number
            );

        if (selectedQuestion) {

            selectedQuestion.classList.add("active");

        }

        updateProgress(number);

    }


    /* =====================================================
       ACTUALIZAR PROGRESO
       ===================================================== */

    function updateProgress(number) {

        if (
            !progressLabel ||
            !progressPercent ||
            !progressFill
        ) {

            return;

        }

        const percentage =
            Math.round((number / 5) * 100);

        progressLabel.textContent =
            "Pregunta " + number + " de 5";

        progressPercent.textContent =
            percentage + "%";

        progressFill.style.width =
            percentage + "%";

    }


    /* =====================================================
       PREGUNTA 1
       ===================================================== */

    const wellbeingAnswers =
        document.querySelectorAll(".wellbeing-answer");


    wellbeingAnswers.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                wellbeingAnswers.forEach(
                    function (item) {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                button.classList.add("selected");


                data.bienestarInicial =
                    button.dataset.value;


                /*
                 * Si la persona está bien,
                 * mostramos primero el estado positivo.
                 */

                if (
                    data.bienestarInicial ===
                        "Me siento bien" ||
                    data.bienestarInicial ===
                        "Me siento de maravilla"
                ) {

                    showWellState();

                    return;

                }


                /*
                 * Si está en otro punto,
                 * continúa automáticamente.
                 */

                setTimeout(
                    function () {

                        showQuestion(2);

                    },
                    300
                );

            }
        );

    });


    /* =====================================================
       MOSTRAR ESTADO POSITIVO
       ===================================================== */

    function showWellState() {

        questions.forEach(
            function (question) {

                question.classList.remove(
                    "active"
                );

            }
        );


        welcomeResult.classList.remove(
            "active"
        );


        wellState.classList.remove(
            "hidden"
        );


        progressLabel.textContent =
            "Tu punto de partida";

        progressPercent.textContent =
            "✓";

        progressFill.style.width =
            "20%";

    }


    /* =====================================================
       EXPLORAR DIRECTAMENTE EL SITIO
       ===================================================== */

    if (exploreSiteNow) {

        exploreSiteNow.addEventListener(
            "click",
            function () {

                closeWelcome();

            }
        );

    }


    /* =====================================================
       CONTINUAR EXPLORANDO
       ===================================================== */

    if (continueExploring) {

        continueExploring.addEventListener(
            "click",
            function () {

                wellState.classList.add(
                    "hidden"
                );

                showQuestion(2);

            }
        );

    }


    /* =====================================================
       COMPARTIR
       ===================================================== */

    if (shareExperience) {

        shareExperience.addEventListener(
            "click",
            async function () {

                const url =
                    window.location.href;

                const shareData = {

                    title:
                        "MAUVITALITY",

                    text:
                        "Encontré esta experiencia de MAUVITALITY. Quizás te sirva para conocer tu punto de partida en bienestar.",

                    url: url

                };


                try {

                    if (
                        navigator.share &&
                        typeof navigator.share ===
                            "function"
                    ) {

                        await navigator.share(
                            shareData
                        );

                        if (shareFeedback) {

                            shareFeedback.textContent =
                                "Gracias por compartir MAUVITALITY. 🌿";

                        }

                    } else {

                        await navigator.clipboard.writeText(
                            url
                        );

                        if (shareFeedback) {

                            shareFeedback.textContent =
                                "Enlace copiado. Ahora puedes enviarlo a quien quieras. 🌿";

                        }

                    }

                } catch (error) {

                    /*
                     * Si cancela compartir,
                     * no mostramos error.
                     */

                    if (
                        error &&
                        error.name !==
                            "AbortError"
                    ) {

                        try {

                            await navigator.clipboard.writeText(
                                url
                            );

                            if (shareFeedback) {

                                shareFeedback.textContent =
                                    "Enlace copiado. Puedes compartirlo con quien quieras.";

                            }

                        } catch (copyError) {

                            if (shareFeedback) {

                                shareFeedback.textContent =
                                    "Puedes copiar el enlace de esta página y compartirlo.";

                            }

                        }

                    }

                }

            }
        );

    }


    /* =====================================================
       PREGUNTA 2
       ===================================================== */

    dimensionAnswers.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const dimension =
                        button.dataset.dimension;


                    button.classList.toggle(
                        "selected"
                    );


                    if (
                        button.classList.contains(
                            "selected"
                        )
                    ) {

                        if (
                            !data.dimensiones.includes(
                                dimension
                            )
                        ) {

                            data.dimensiones.push(
                                dimension
                            );

                        }

                    } else {

                        data.dimensiones =
                            data.dimensiones.filter(
                                function (item) {

                                    return (
                                        item !==
                                        dimension
                                    );

                                }
                            );

                    }


                    question2Next.disabled =
                        data.dimensiones.length === 0;

                }
            );

        }
    );


    /* =====================================================
       PREGUNTA 2 → PREGUNTA 3
       ===================================================== */

    if (question2Next) {

        question2Next.addEventListener(
            "click",
            function () {

                if (
                    data.dimensiones.length === 0
                ) {

                    return;

                }

                renderDynamicCategories();

                showQuestion(3);

            }
        );

    }


    /* =====================================================
       CREAR CATEGORÍAS DE PREGUNTA 3
       ===================================================== */

    function renderDynamicCategories() {

        if (!dynamicCategories) {
            return;
        }

        dynamicCategories.innerHTML = "";

        data.necesidades = [];


        data.dimensiones.forEach(
            function (dimension, index) {

                const category =
                    document.createElement(
                        "section"
                    );

                category.className =
                    "dynamic-category";


                const heading =
                    document.createElement(
                        "div"
                    );

                heading.className =
                    "dynamic-category-heading";


                const number =
                    document.createElement(
                        "span"
                    );

                number.className =
                    "dynamic-category-number";

                number.textContent =
                    String(index + 1)
                        .padStart(2, "0");


                const headingText =
                    document.createElement(
                        "div"
                    );


                const kicker =
                    document.createElement(
                        "span"
                    );

                kicker.className =
                    "dynamic-category-kicker";

                kicker.textContent =
                    "ÁREA " +
                    dimension.toUpperCase();


                const title =
                    document.createElement(
                        "h3"
                    );

                title.textContent =
                    dimension;


                const description =
                    document.createElement(
                        "p"
                    );

                description.textContent =
                    dimensionDescriptions[
                        dimension
                    ];


                headingText.appendChild(
                    kicker
                );

                headingText.appendChild(
                    title
                );

                headingText.appendChild(
                    description
                );


                heading.appendChild(
                    number
                );

                heading.appendChild(
                    headingText
                );


                const optionsGrid =
                    document.createElement(
                        "div"
                    );

                optionsGrid.className =
                    "dynamic-options-grid";


                dimensionOptions[
                    dimension
                ].forEach(
                    function (option) {

                        const optionButton =
                            document.createElement(
                                "button"
                            );

                        optionButton.type =
                            "button";

                        optionButton.className =
                            "dynamic-option";

                        optionButton.textContent =
                            option;

                        optionButton.dataset.dimension =
                            dimension;

                        optionButton.dataset.option =
                            option;


                        optionButton.addEventListener(
                            "click",
                            function () {

                                optionButton.classList.toggle(
                                    "selected"
                                );


                                const exists =
                                    data.necesidades.some(
                                        function (item) {

                                            return (
                                                item.dimension ===
                                                    dimension &&
                                                item.option ===
                                                    option
                                            );

                                        }
                                    );


                                if (
                                    optionButton.classList.contains(
                                        "selected"
                                    )
                                ) {

                                    if (!exists) {

                                        data.necesidades.push(
                                            {
                                                dimension:
                                                    dimension,

                                                option:
                                                    option
                                            }
                                        );

                                    }

                                } else {

                                    data.necesidades =
                                        data.necesidades.filter(
                                            function (item) {

                                                return !(
                                                    item.dimension ===
                                                        dimension &&
                                                    item.option ===
                                                        option
                                                );

                                            }
                                        );

                                }


                                question3Next.disabled =
                                    data.necesidades.length === 0;

                            }
                        );


                        optionsGrid.appendChild(
                            optionButton
                        );

                    }
                );


                category.appendChild(
                    heading
                );

                category.appendChild(
                    optionsGrid
                );

                dynamicCategories.appendChild(
                    category
                );

            }
        );


        question3Next.disabled = true;

    }


    /* =====================================================
       PREGUNTA 3 → PREGUNTA 4
       ===================================================== */

    if (question3Next) {

        question3Next.addEventListener(
            "click",
            function () {

                if (
                    data.necesidades.length === 0
                ) {

                    return;

                }

                showQuestion(4);

                clearGoal();

            }
        );

    }


    /* =====================================================
       OBJETIVO PERSONAL
       ===================================================== */

    function clearGoal() {

        if (personalGoal) {

            personalGoal.value = "";

        }

        if (characterCount) {

            characterCount.textContent =
                "0 / 300";

        }

        if (question4Next) {

            question4Next.disabled = true;

        }

    }


    if (personalGoal) {

        personalGoal.addEventListener(
            "input",
            function () {

                const value =
                    personalGoal.value.trim();


                if (characterCount) {

                    characterCount.textContent =
                        personalGoal.value.length +
                        " / 300";

                }


                if (question4Next) {

                    question4Next.disabled =
                        value.length < 3;

                }

            }
        );

    }


    /* =====================================================
       PREGUNTA 4 → PREGUNTA 5
       ===================================================== */

    if (question4Next) {

        question4Next.addEventListener(
            "click",
            function () {

                const value =
                    personalGoal.value.trim();


                if (
                    value.length < 3
                ) {

                    return;

                }


                data.objetivo =
                    value;


                showQuestion(5);

            }
        );

    }


    /* =====================================================
       PREGUNTA 5
       ===================================================== */

    const commitmentAnswers =
        document.querySelectorAll(
            ".commitment-answer"
        );


    commitmentAnswers.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    commitmentAnswers.forEach(
                        function (item) {

                            item.classList.remove(
                                "selected"
                            );

                        }
                    );


                    button.classList.add(
                        "selected"
                    );


                    data.compromiso =
                        button.dataset.value;


                    setTimeout(
                        function () {

                            showResult();

                        },
                        300
                    );

                }
            );

        }
    );


    /* =====================================================
       RESULTADO
       ===================================================== */

    function showResult() {

        questions.forEach(
            function (question) {

                question.classList.remove(
                    "active"
                );

            }
        );


        /* Bienestar */

        resultWellbeing.textContent =
            data.bienestarInicial;


        /* Áreas */

        resultArea.textContent =
            data.dimensiones.join(
                " · "
            );


        /* Necesidades */

        const groupedNeeds =
            data.necesidades.map(
                function (item) {

                    return (
                        item.dimension +
                        ": " +
                        item.option
                    );

                }
            );


        resultNeed.textContent =
            groupedNeeds.join(
                " · "
            );


        /* Objetivo */

        resultGoal.textContent =
            data.objetivo;


        /* Compromiso */

        const commitmentLabels = {

            "1":
                "Necesito comenzar",

            "2":
                "Estoy pensando en hacerlo",

            "3":
                "Estoy dispuesto",

            "4":
                "Estoy bastante dispuesto",

            "5":
                "Estoy totalmente comprometido"

        };


        resultCommitment.textContent =
            commitmentLabels[
                data.compromiso
            ];


        /* Mostrar resultado */

        welcomeResult.classList.add(
            "active"
        );


        progressLabel.textContent =
            "Completado";

        progressPercent.textContent =
            "100%";

        progressFill.style.width =
            "100%";

    }


    /* =====================================================
       ENTRAR AL SITIO
       ===================================================== */

    if (enterSite) {

        enterSite.addEventListener(
            "click",
            function () {

                data.fechaInicio =
                    new Date().toISOString();


                /*
                 * Guardamos solamente si la persona
                 * lo solicita.
                 */

                if (
                    saveConsent &&
                    saveConsent.checked
                ) {

                    localStorage.setItem(
                        "mauvitalityData",
                        JSON.stringify(data)
                    );

                }


                /*
                 * Actualizamos la sección personal
                 * antes de cerrar la bienvenida.
                 */

                renderPersonalizedExperience();

                personalizeStories();

                closeWelcome();

            }
        );

    }


    /* =====================================================
       CERRAR BIENVENIDA
       ===================================================== */

    function closeWelcome() {

        welcomeScreen.classList.add(
            "hide"
        );

        document.body.classList.remove(
            "no-scroll"
        );


        setTimeout(
            function () {

                welcomeScreen.style.display =
                    "none";

            },
            650
        );

    }


    /* =====================================================
       LIMPIAR EL OBJETIVO AL CARGAR / RECARGAR
       ===================================================== */

    function resetGoalOnLoad() {

        if (personalGoal) {

            personalGoal.value = "";

        }

        if (characterCount) {

            characterCount.textContent =
                "0 / 300";

        }

    }


    resetGoalOnLoad();


    window.addEventListener(
        "pageshow",
        function () {

            resetGoalOnLoad();

        }
    );


    /* =====================================================
       NAVBAR
       ===================================================== */

    /*
     * CORRECCIÓN:
     * El HTML utiliza .main-nav,
     * no .navbar.
     */

    const navbar =
        document.querySelector(".main-nav");


    window.addEventListener(
        "scroll",
        function () {

            if (!navbar) {

                return;

            }


            if (window.scrollY > 30) {

                navbar.style.boxShadow =
                    "0 8px 30px rgba(24,34,29,0.08)";

            } else {

                navbar.style.boxShadow =
                    "none";

            }

        }
    );


    /* =========================================================
       MAUVITALITY
       PERSONALIZACIÓN DEL SITIO
       ========================================================= */

    function renderPersonalizedExperience() {

        const wellbeing =
            document.getElementById(
                "personal-wellbeing"
            );

        const dimensions =
            document.getElementById(
                "personal-dimensions"
            );

        const needs =
            document.getElementById(
                "personal-needs"
            );

        const goal =
            document.getElementById(
                "personal-goal"
            );

        const guidance =
            document.getElementById(
                "personal-guidance"
            );

        const message =
            document.getElementById(
                "personal-message"
            );


        if (
            !wellbeing ||
            !dimensions ||
            !needs ||
            !goal
        ) {

            return;

        }


        if (
            !data.bienestarInicial &&
            !data.dimensiones.length
        ) {

            wellbeing.textContent = "—";

            dimensions.textContent = "—";

            needs.textContent = "—";

            goal.textContent = "—";


            if (guidance) {

                guidance.textContent =
                    "Todavía no hemos definido tu punto de partida.";

            }


            if (message) {

                message.textContent =
                    "Puedes comenzar la experiencia cuando quieras.";

            }


            return;

        }


        wellbeing.textContent =
            data.bienestarInicial || "—";


        dimensions.textContent =
            data.dimensiones.length
                ? data.dimensiones.join(" · ")
                : "—";


        /*
         * CORRECCIÓN:
         * data.necesidades contiene objetos.
         * Antes aparecía [object Object].
         */

        const formattedNeeds =
            data.necesidades.map(
                function (item) {

                    if (
                        item &&
                        typeof item === "object"
                    ) {

                        return (
                            item.dimension +
                            ": " +
                            item.option
                        );

                    }

                    return String(item);

                }
            );


        needs.textContent =
            formattedNeeds.length
                ? formattedNeeds.join(" · ")
                : "—";


        goal.textContent =
            data.objetivo || "—";


        if (guidance) {

            guidance.textContent =
                "Este es el punto desde el que estás comenzando.";

        }


        if (message) {

            message.textContent =
                "No necesitas tener todo resuelto. Puedes avanzar paso a paso.";

        }

    }


    /* =====================================================
       CARGAR EXPERIENCIA GUARDADA
       ===================================================== */

    try {

        const savedData =
            localStorage.getItem(
                "mauvitalityData"
            );


        if (savedData) {

            const parsed =
                JSON.parse(savedData);


            if (parsed) {

                data.bienestarInicial =
                    parsed.bienestarInicial || "";


                data.dimensiones =
                    Array.isArray(
                        parsed.dimensiones
                    )
                        ? parsed.dimensiones
                        : [];


                data.necesidades =
                    Array.isArray(
                        parsed.necesidades
                    )
                        ? parsed.necesidades
                        : [];


                data.objetivo =
                    parsed.objetivo || "";


                data.compromiso =
                    parsed.compromiso || "";


                data.fechaInicio =
                    parsed.fechaInicio || null;

            }

        }

    } catch (error) {

        console.log(
            "No se pudo cargar la experiencia guardada."
        );

    }


    renderPersonalizedExperience();


    /* =====================================================
       ACTUALIZAR EXPERIENCIA DESPUÉS DEL ONBOARDING
       ===================================================== */

    if (exploreSiteNow) {

        exploreSiteNow.addEventListener(
            "click",
            function () {

                renderPersonalizedExperience();

                personalizeStories();


                setTimeout(
                    function () {

                        const point =
                            document.getElementById(
                                "mi-punto"
                            );


                        if (point) {

                            point.scrollIntoView({
                                behavior: "smooth"
                            });

                        }

                    },
                    700
                );

            }
        );

    }


    /* =====================================================
       COMENZAR / REABRIR EXPERIENCIA
       ===================================================== */

    const beginButtons =
        document.querySelectorAll(
            ".begin-experience"
        );


    function reopenWelcome() {

        welcomeScreen.style.display =
            "block";


        welcomeScreen.classList.remove(
            "hide"
        );


        document.body.classList.add(
            "no-scroll"
        );


        welcomeIntro.classList.remove(
            "hidden"
        );


        welcomeSurvey.classList.remove(
            "active"
        );


        wellState.classList.add(
            "hidden"
        );


        welcomeResult.classList.remove(
            "active"
        );


        data.bienestarInicial = "";

        data.dimensiones = [];

        data.necesidades = [];

        data.objetivo = "";

        data.compromiso = "";

        data.fechaInicio = null;


        wellbeingAnswers.forEach(
            function (button) {

                button.classList.remove(
                    "selected"
                );

            }
        );


        dimensionAnswers.forEach(
            function (button) {

                button.classList.remove(
                    "selected"
                );

            }
        );


        commitmentAnswers.forEach(
            function (button) {

                button.classList.remove(
                    "selected"
                );

            }
        );


        if (dynamicCategories) {

            dynamicCategories.innerHTML =
                "";

        }


        if (question2Next) {

            question2Next.disabled =
                true;

        }


        if (question3Next) {

            question3Next.disabled =
                true;

        }


        if (question4Next) {

            question4Next.disabled =
                true;

        }


        if (saveConsent) {

            saveConsent.checked =
                false;

        }


        clearGoal();

        showQuestion(1);

        updateProgress(1);

    }


    beginButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                reopenWelcome
            );

        }
    );
/* =====================================================
   BOTÓN FINAL → VOLVER A MI PUNTO DE PARTIDA
   ===================================================== */

const finalPersonalButton =
    document.getElementById(
        "final-personal-button"
    );

if (finalPersonalButton) {

    finalPersonalButton.addEventListener(
        "click",
        function () {

            const point =
                document.getElementById(
                    "mi-punto"
                );

            if (point) {

                point.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}

    /* =====================================================
       BOTONES DE DIMENSIONES
       ===================================================== */

    const dimensionCards =
        document.querySelectorAll(
            ".dimension-card"
        );


    dimensionCards.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    const dimension =
                        card.dataset.dimension;


                    document
                        .querySelectorAll(
                            ".dimension-card"
                        )
                        .forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                    card.classList.add(
                        "active"
                    );


                    const filter =
                        document.querySelector(
                            '.story-filter[data-story-filter="' +
                            dimension +
                            '"]'
                        );


                    if (filter) {

                        filter.click();

                    }


                    const stories =
                        document.getElementById(
                            "historias"
                        );


                    if (stories) {

                        stories.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }
            );

        }
    );


    /* =====================================================
       HISTORIAS
       ===================================================== */

    const storyFilters =
        document.querySelectorAll(
            ".story-filter"
        );

    const storyCards =
        document.querySelectorAll(
            ".story-card"
        );


    function filterStories(filter) {

        storyCards.forEach(
            function (card) {

                const dimension =
                    card.dataset.storyDimension;


                if (
                    filter === "Todos" ||
                    dimension === filter
                ) {

                    card.classList.remove(
                        "is-hidden"
                    );

                } else {

                    card.classList.add(
                        "is-hidden"
                    );

                }

            }
        );

    }


    storyFilters.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    storyFilters.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    filterStories(
                        button.dataset.storyFilter
                    );

                }
            );

        }
    );


    /* =====================================================
       PRIORIZAR DIMENSIONES ELEGIDAS
       ===================================================== */

    function personalizeStories() {

        if (
            !data.dimensiones ||
            !data.dimensiones.length
        ) {

            return;

        }


        const storiesGrid =
            document.querySelector(
                ".stories-grid"
            );


        if (!storiesGrid) {

            return;

        }


        const cards =
            Array.from(
                storiesGrid.querySelectorAll(
                    ".story-card"
                )
            );


        cards.sort(
            function (a, b) {

                const aDimension =
                    a.dataset.storyDimension;

                const bDimension =
                    b.dataset.storyDimension;


                const aSelected =
                    data.dimensiones.includes(
                        aDimension
                    );


                const bSelected =
                    data.dimensiones.includes(
                        bDimension
                    );


                return (
                    Number(bSelected) -
                    Number(aSelected)
                );

            }
        );


        cards.forEach(
            function (card) {

                storiesGrid.appendChild(
                    card
                );

            }
        );

    }


    personalizeStories();


    /* =====================================================
       VIDEOS
       ===================================================== */

    const videoFilters =
        document.querySelectorAll(
            ".video-filter"
        );

    const videoCards =
        document.querySelectorAll(
            ".video-card"
        );


    videoFilters.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    videoFilters.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const filter =
                        button.dataset.videoFilter;


                    videoCards.forEach(
                        function (card) {

                            const type =
                                card.dataset.videoType;


                            if (
                                filter === "Todos" ||
                                type === filter
                            ) {

                                card.classList.remove(
                                    "is-hidden"
                                );

                            } else {

                                card.classList.add(
                                    "is-hidden"
                                );

                            }

                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       EXPERIENCIAS
       ===================================================== */

    const experienceFilters =
        document.querySelectorAll(
            ".experience-filter"
        );

    const experienceCards =
        document.querySelectorAll(
            ".experience-card"
        );


    experienceFilters.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    experienceFilters.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const filter =
                        button.dataset
                            .experienceFilter;


                    experienceCards.forEach(
                        function (card) {

                            const type =
                                card.dataset
                                    .experienceType;


                            if (
                                filter === "Todos" ||
                                type === filter
                            ) {

                                card.classList.remove(
                                    "is-hidden"
                                );

                            } else {

                                card.classList.add(
                                    "is-hidden"
                                );

                            }

                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       NAVEGACIÓN SUAVE
       ===================================================== */

    document
        .querySelectorAll(
            '.main-nav a[href^="#"], ' +
            '.footer-links a[href^="#"], ' +
            '.hero-actions a[href^="#"]'
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {

                            return;

                        }


                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth"
                        });

                    }
                );

            }
        );

});
/* =========================================================
   HERRAMIENTA 02
   EXPANDIR MOVIMIENTO & RECUPERACIÓN
   ========================================================= */

const movementToggle =
    document.getElementById("movement-toggle");

const movementContent =
    document.getElementById("movement-content");


if (movementToggle && movementContent) {

    movementToggle.addEventListener(
        "click",
        function () {

            const isOpen =
                movementToggle.getAttribute(
                    "aria-expanded"
                ) === "true";


            movementToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );


            movementToggle.classList.toggle(
                "is-open",
                !isOpen
            );


            if (isOpen) {

                movementContent.hidden = true;

            } else {

                movementContent.hidden = false;

            }

        }
    );

}
/* =========================================================
   INICIO · HERRAMIENTA 01
   EXPANDIR NUTRICIÓN
   ========================================================= */

const nutritionToggle =
    document.getElementById("nutrition-toggle");

const nutritionContent =
    document.getElementById("nutrition-content");


if (nutritionToggle && nutritionContent) {

    nutritionToggle.addEventListener(
        "click",
        function () {

            const isOpen =
                nutritionToggle.getAttribute(
                    "aria-expanded"
                ) === "true";


            nutritionToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );


            nutritionToggle.classList.toggle(
                "is-open",
                !isOpen
            );


            if (isOpen) {

                nutritionContent.hidden = true;

            } else {

                nutritionContent.hidden = false;

            }

        }
    );

}


/* =========================================================
   FIN · HERRAMIENTA 01
   EXPANDIR NUTRICIÓN
   ========================================================= */
   /* =========================================================
   INICIO · HERRAMIENTA 03
   EXPANDIR DESCANSO
   ========================================================= */

const restToggle =
    document.getElementById("rest-toggle");

const restContent =
    document.getElementById("rest-content");


if (restToggle && restContent) {

    restToggle.addEventListener(
        "click",
        function () {

            const isOpen =
                restToggle.getAttribute(
                    "aria-expanded"
                ) === "true";


            restToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );


            restToggle.classList.toggle(
                "is-open",
                !isOpen
            );


            if (isOpen) {

                restContent.hidden = true;

            } else {

                restContent.hidden = false;

            }

        }
    );

}


/* =========================================================
   FIN · HERRAMIENTA 03
   EXPANDIR DESCANSO
   ========================================================= */
   /* =========================================================
   INICIO · HERRAMIENTA 04
   EXPANDIR APRENDIZAJE
   ========================================================= */

const learningToggle =
    document.getElementById("learning-toggle");

const learningContent =
    document.getElementById("learning-content");


if (learningToggle && learningContent) {

    learningToggle.addEventListener(
        "click",
        function () {

            const isOpen =
                learningToggle.getAttribute(
                    "aria-expanded"
                ) === "true";


            learningToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );


            learningToggle.classList.toggle(
                "is-open",
                !isOpen
            );


            if (isOpen) {

                learningContent.hidden = true;

            } else {

                learningContent.hidden = false;

            }

        }
    );

}


/* =========================================================
   FIN · HERRAMIENTA 04
   EXPANDIR APRENDIZAJE
   ========================================================= */
   /* =========================================================
   INICIO · HERRAMIENTA 05
   EXPANDIR RECURSOS
   ========================================================= */

const resourcesToggle =
    document.getElementById("resources-toggle");

const resourcesContent =
    document.getElementById("resources-content");


if (resourcesToggle && resourcesContent) {

    resourcesToggle.addEventListener(
        "click",
        function () {

            const isOpen =
                resourcesToggle.getAttribute(
                    "aria-expanded"
                ) === "true";


            resourcesToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );


            resourcesToggle.classList.toggle(
                "is-open",
                !isOpen
            );


            if (isOpen) {

                resourcesContent.hidden = true;

            } else {

                resourcesContent.hidden = false;

            }

        }
    );

}


/* =========================================================
   FIN · HERRAMIENTA 05
   EXPANDIR RECURSOS
   ========================================================= */