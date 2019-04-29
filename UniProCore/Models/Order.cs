using System;
using UniProCore.Identity;

namespace UniProCore.Models
{
    /// <summary>
    /// Заявка на подключение
    /// </summary>
    public class Order
    {
        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Входящий номер
        /// </summary>
        public int? Number { get; set; }

        /// <summary>
        /// Основание подключения
        /// </summary>
        public string Reason { get; set; }

        /// <summary>
        /// Город объекта подключения
        /// </summary>
        public string City { get; set; }

        /// <summary>
        /// Адрес объекта подключения
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// Характеристики и назначение объекта 
        /// </summary>
        public string Characteristic { get; set; }

        /// <summary>
        /// Вид и параметры теплоносителя
        /// </summary>
        public string LoadType { get; set; }

        /// <summary>
        /// Режим теплопотребления
        /// </summary>
        public string ConsumptionMode { get; set; }

        /// <summary>
        /// Расположение узла учета
        /// </summary>
        public string Location { get; set; }

        /// <summary>
        /// Возможность использования собственных источников тепла
        /// </summary>
        public string OwnHeat { get; set; }

        /// <summary>
        /// Требование по надёжности теплоснабжения объекта
        /// </summary>
        public string Requirement { get; set; }

        /// <summary>
        ///Правовые основания пользования заявителем подключаемым объектом (при подключении существующего подключаемого объекта)
        /// </summary>
        public string LegalGroundsToUseObject { get; set; }

        /// <summary>
        ///Правовые основания пользования заявителем земельным участком, на котором расположен существующий подключаемый объект
        ///или предполагается создание подключаемого объекта")
        /// </summary>
        public string LegalGroundsToUseLand { get; set; }

        /// <summary>
        /// Технические условия №
        /// </summary>
        public string SpecificationNumber { get; set; }

        /// <summary>
        /// Технические условия дата выдачи
        /// </summary>
        public DateTime? SpecificationDate { get; set; }

        /// <summary>
        /// Нормативный срок строительства
        /// </summary>
        public string LandBoundary { get; set; }

        /// <summary>
        /// Срок сдачи объекта(ввода в эксплуатацию)
        /// </summary>
        public string WorkDate { get; set; }

        /// <summary>
        /// Информация о виде разрешенного использования земельного участка
        /// </summary>
        public string LandUseInfo { get; set; }

        /// <summary>
        /// Дата подачи
        /// </summary>
        public DateTime? CreateDate { get; set; }

        /// <summary>
        /// Время записи
        /// </summary>
        public DateTime Write { get; set; }

        /// <summary>
        ///Исполнитель
        /// </summary>
        public string Executor { get; set; }

        /// <summary>
        ///Контактный номер исполнителя
        /// </summary>
        public string ContactPhoneNumber { get; set; }

        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
